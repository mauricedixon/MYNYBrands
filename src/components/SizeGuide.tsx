"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

interface SizeGuideProps {
    isOpen: boolean;
    onClose: () => void;
    category?: string;
}

const sizeData = {
    jackets: {
        title: "Jackets & Outerwear",
        headers: ["Size", "Chest", "Shoulders", "Length", "Sleeve"],
        rows: [
            ["S", "36-38\"", "17\"", "26\"", "24\""],
            ["M", "38-40\"", "18\"", "27\"", "25\""],
            ["L", "40-42\"", "19\"", "28\"", "26\""],
            ["XL", "42-44\"", "20\"", "29\"", "27\""],
        ],
    },
    sweaters: {
        title: "Sweaters & Fleece",
        headers: ["Size", "Chest", "Length", "Sleeve"],
        rows: [
            ["S", "36-38\"", "25\"", "32\""],
            ["M", "38-40\"", "26\"", "33\""],
            ["L", "40-42\"", "27\"", "34\""],
            ["XL", "42-44\"", "28\"", "35\""],
        ],
    },
    tshirts: {
        title: "T-Shirts",
        headers: ["Size", "Chest", "Length", "Sleeve"],
        rows: [
            ["S", "35-37\"", "27\"", "8\""],
            ["M", "38-40\"", "28\"", "8.5\""],
            ["L", "41-43\"", "29\"", "9\""],
            ["XL", "44-46\"", "30\"", "9.5\""],
        ],
    },
    headwear: {
        title: "Headwear",
        headers: ["Size", "Circumference", "Depth"],
        rows: [
            ["S/M", "21-22\"", "4\""],
            ["L/XL", "22.5-23.5\"", "4.5\""],
            ["One Size", "Adjustable", "-"],
        ],
    },
};

export const SizeGuide = ({ isOpen, onClose, category = "jackets" }: SizeGuideProps) => {
    const { setCursorVariant } = useCursor();
    const [activeTab, setActiveTab] = useState<keyof typeof sizeData>(
        (category.toLowerCase() as keyof typeof sizeData) || "jackets"
    );

    const currentData = sizeData[activeTab];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-x-4 top-[10%] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white z-[101] max-w-2xl w-full max-h-[80vh] overflow-hidden rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <Ruler className="w-5 h-5" />
                                <h2 className="text-lg font-heading font-bold uppercase tracking-tight">
                                    Size Guide
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                                onMouseEnter={() => setCursorVariant("link")}
                                onMouseLeave={() => setCursorVariant("default")}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 overflow-x-auto">
                            {Object.entries(sizeData).map(([key, data]) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key as keyof typeof sizeData)}
                                    className={`px-6 py-3 text-sm uppercase tracking-wide font-medium whitespace-nowrap transition-colors relative ${activeTab === key ? "text-black" : "text-gray-400 hover:text-gray-600"
                                        }`}
                                    onMouseEnter={() => setCursorVariant("link")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                >
                                    {data.title}
                                    {activeTab === key && (
                                        <motion.div
                                            layoutId="sizeGuideTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[50vh]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Size Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b-2 border-black">
                                                    {currentData.headers.map((header) => (
                                                        <th
                                                            key={header}
                                                            className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                                                        >
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData.rows.map((row, rowIndex) => (
                                                    <tr
                                                        key={rowIndex}
                                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                                    >
                                                        {row.map((cell, cellIndex) => (
                                                            <td
                                                                key={cellIndex}
                                                                className={`px-4 py-3 text-sm ${cellIndex === 0 ? "font-bold" : "font-mono text-gray-600"
                                                                    }`}
                                                            >
                                                                {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* How to Measure */}
                                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                                        <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
                                            How to Measure
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <span className="font-bold text-black">Chest:</span>
                                                Measure under your arms, around the fullest part of your chest.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="font-bold text-black">Length:</span>
                                                Measure from the highest point of the shoulder to the bottom hem.
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="font-bold text-black">Sleeve:</span>
                                                Measure from the shoulder seam to the cuff.
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Fit Note */}
                                    <p className="mt-4 text-xs text-gray-400 text-center">
                                        All measurements are in inches. If between sizes, we recommend sizing up for a relaxed fit.
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
