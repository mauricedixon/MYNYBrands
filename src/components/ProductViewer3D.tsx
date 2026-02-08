"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    Box,
    Square,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

interface ProductViewer3DProps {
    images: string[];
    productName: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ProductViewer3D = ({
    images,
    productName,
    isOpen,
    onClose
}: ProductViewer3DProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scale, setScale] = useState(1);
    const [is3DMode, setIs3DMode] = useState(true);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setScale(1);
            setRotation({ x: 0, y: 0 });
            setCurrentIndex(0);
        }
    }, [isOpen]);

    // Zoom controls
    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
    const handleReset = () => {
        setScale(1);
        setRotation({ x: 0, y: 0 });
    };

    // Mouse wheel zoom
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    };

    // 3D rotation via drag
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!is3DMode) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !is3DMode) return;
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        setRotation(prev => ({
            x: Math.max(-30, Math.min(30, prev.x + deltaY * 0.2)),
            y: prev.y + deltaX * 0.3
        }));

        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => setIsDragging(false);

    // Navigate images (simulates rotation)
    const nextImage = () => {
        setCurrentIndex(prev => (prev + 1) % images.length);
        // Add flip animation feel
        setRotation(prev => ({ ...prev, y: prev.y + 180 }));
    };

    const prevImage = () => {
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
        setRotation(prev => ({ ...prev, y: prev.y - 180 }));
    };

    // Close on escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
                onClick={onClose}
            >
                {/* Main Container */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full h-full max-w-5xl max-h-[90vh] m-4 flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                        <div>
                            <h2 className="text-white font-heading font-bold text-xl uppercase tracking-tight">
                                {productName}
                            </h2>
                            <p className="text-white/50 text-sm mt-1">
                                {is3DMode ? "Drag to rotate • Scroll to zoom" : "2D View"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Image Viewer */}
                    <div
                        ref={containerRef}
                        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        {/* 3D Image Container */}
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                perspective: is3DMode ? "1000px" : "none",
                            }}
                        >
                            <motion.div
                                animate={{
                                    scale,
                                    rotateX: is3DMode ? rotation.x : 0,
                                    rotateY: is3DMode ? rotation.y : 0,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 25,
                                }}
                                className="relative w-[80%] h-[80%]"
                                style={{
                                    transformStyle: is3DMode ? "preserve-3d" : "flat",
                                }}
                            >
                                <Image
                                    src={images[currentIndex]}
                                    alt={`${productName} view ${currentIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* View Indicator */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                                            ? "bg-white w-6"
                                            : "bg-white/30 hover:bg-white/60"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-2 px-6 py-4 border-t border-white/10">
                        {/* Zoom Out */}
                        <button
                            onClick={handleZoomOut}
                            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                            title="Zoom Out"
                        >
                            <ZoomOut size={18} />
                        </button>

                        {/* Zoom Level */}
                        <span className="text-white/60 text-sm font-mono w-16 text-center">
                            {Math.round(scale * 100)}%
                        </span>

                        {/* Zoom In */}
                        <button
                            onClick={handleZoomIn}
                            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                            title="Zoom In"
                        >
                            <ZoomIn size={18} />
                        </button>

                        <div className="w-px h-6 bg-white/20 mx-2" />

                        {/* Reset */}
                        <button
                            onClick={handleReset}
                            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                            title="Reset View"
                        >
                            <RotateCcw size={18} />
                        </button>

                        <div className="w-px h-6 bg-white/20 mx-2" />

                        {/* 2D/3D Toggle */}
                        <button
                            onClick={() => setIs3DMode(false)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${!is3DMode ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                            title="2D View"
                        >
                            <Square size={18} />
                        </button>
                        <button
                            onClick={() => setIs3DMode(true)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${is3DMode ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                            title="3D View"
                        >
                            <Box size={18} />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
