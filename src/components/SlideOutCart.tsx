"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCursor } from "@/context/CursorContext";

export const SlideOutCart = () => {
    const {
        cartItems,
        isCartOpen,
        closeCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        subtotal,
        shipping,
        total,
        freeShippingThreshold,
        freeShippingProgress,
    } = useCart();
    const { setCursorVariant } = useCursor();
    const cartRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeCart();
        };
        if (isCartOpen) {
            document.addEventListener("keydown", handleEscape);
        }
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isCartOpen, closeCart]);

    const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                        onClick={closeCart}
                    />

                    {/* Cart Panel */}
                    <motion.div
                        ref={cartRef}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5" />
                                <h2 className="text-lg font-heading font-bold uppercase tracking-tight">
                                    Your Bag
                                </h2>
                                <span className="text-sm text-gray-500">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                            </div>
                            <button
                                onClick={closeCart}
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                                onMouseEnter={() => setCursorVariant("link")}
                                onMouseLeave={() => setCursorVariant("default")}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Free Shipping Progress */}
                        {subtotal > 0 && (
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Truck size={16} className={freeShippingProgress >= 100 ? "text-green-600" : "text-gray-400"} />
                                    <span className="text-sm">
                                        {freeShippingProgress >= 100 ? (
                                            <span className="text-green-600 font-medium">You&apos;ve unlocked free shipping!</span>
                                        ) : (
                                            <>
                                                <span className="font-medium">${amountUntilFreeShipping.toFixed(0)}</span>
                                                <span className="text-gray-500"> away from free shipping</span>
                                            </>
                                        )}
                                    </span>
                                </div>
                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${freeShippingProgress}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className={`h-full rounded-full ${freeShippingProgress >= 100 ? "bg-green-500" : "bg-black"
                                            }`}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                                    <p className="text-lg font-medium text-gray-900 mb-2">Your bag is empty</p>
                                    <p className="text-sm text-gray-500 mb-6">Looks like you haven&apos;t added anything yet</p>
                                    <button
                                        onClick={closeCart}
                                        className="px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                                        onMouseEnter={() => setCursorVariant("link")}
                                        onMouseLeave={() => setCursorVariant("default")}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <AnimatePresence mode="popLayout">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.uniqueId}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                                                className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0"
                                            >
                                                {/* Product Image */}
                                                <Link
                                                    href={`/shop/${item.id}`}
                                                    onClick={closeCart}
                                                    className="relative w-24 h-28 bg-gray-100 flex-shrink-0 overflow-hidden group"
                                                    onMouseEnter={() => setCursorVariant("link")}
                                                    onMouseLeave={() => setCursorVariant("default")}
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </Link>

                                                {/* Product Details */}
                                                <div className="flex-1 flex flex-col">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <Link
                                                            href={`/shop/${item.id}`}
                                                            onClick={closeCart}
                                                            className="font-heading font-bold text-sm uppercase tracking-tight hover:text-gray-600 transition-colors line-clamp-2"
                                                            onMouseEnter={() => setCursorVariant("link")}
                                                            onMouseLeave={() => setCursorVariant("default")}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <button
                                                            onClick={() => removeFromCart(item.uniqueId)}
                                                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                                                            onMouseEnter={() => setCursorVariant("link")}
                                                            onMouseLeave={() => setCursorVariant("default")}
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>

                                                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                                                        Size: {item.selectedSize}
                                                    </span>

                                                    <div className="mt-auto flex items-center justify-between">
                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center border border-gray-200">
                                                            <button
                                                                onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                                onMouseEnter={() => setCursorVariant("link")}
                                                                onMouseLeave={() => setCursorVariant("default")}
                                                            >
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="w-8 text-center text-sm font-mono">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                                onMouseEnter={() => setCursorVariant("link")}
                                                                onMouseLeave={() => setCursorVariant("default")}
                                                            >
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>

                                                        {/* Price */}
                                                        <span className="font-mono font-medium">
                                                            ${(item.price * item.quantity).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Footer - Summary & Checkout */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-100 px-6 py-6 bg-gray-50">
                                {/* Summary */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-mono">${subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className={`font-mono ${shipping === 0 ? "text-green-600" : ""}`}>
                                            {shipping === 0 ? "FREE" : `$${shipping}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                                        <span>Total</span>
                                        <span className="font-mono">${total.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link
                                    href="/checkout"
                                    onClick={closeCart}
                                    className="w-full bg-black text-white py-4 flex items-center justify-center gap-2 font-bold font-heading uppercase tracking-widest text-sm hover:bg-brand-red transition-colors group"
                                    onMouseEnter={() => setCursorVariant("link")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                >
                                    Checkout
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {/* Continue Shopping */}
                                <button
                                    onClick={closeCart}
                                    className="w-full mt-3 py-3 text-sm text-gray-600 hover:text-black transition-colors uppercase tracking-wide"
                                    onMouseEnter={() => setCursorVariant("link")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                >
                                    Continue Shopping
                                </button>

                                {/* Trust Badges */}
                                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200 text-xs text-gray-400">
                                    <span>🔒 Secure Checkout</span>
                                    <span>•</span>
                                    <span>📦 Free Returns</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
