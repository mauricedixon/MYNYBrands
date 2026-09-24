"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Truck, Tag, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useCursor } from "@/context/CursorContext";

export default function CheckoutPage() {
    const { cartItems, subtotal, shipping, total, freeShippingThreshold } = useCart();
    const { setCursorVariant } = useCursor();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Payment happens on Stripe's hosted page; this app never sees card details.
    const handleCheckout = async () => {
        setIsRedirecting(true);
        setError(null);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartItems.map((item) => ({
                        id: item.id,
                        size: item.selectedSize,
                        quantity: item.quantity,
                    })),
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.url) {
                throw new Error(data.error ?? "We couldn't start checkout. Please try again.");
            }
            window.location.href = data.url;
        } catch (e) {
            setError(e instanceof Error ? e.message : "We couldn't start checkout. Please try again.");
            setIsRedirecting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <div className="container mx-auto px-6 pt-32 text-center">
                    <h1 className="text-3xl font-heading font-bold uppercase mb-4">Your cart is empty</h1>
                    <Link
                        href="/#shop"
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-brand-red transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-6 pt-28 pb-20">
                <Link
                    href="/#shop"
                    className="inline-flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8"
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Review Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                            <h1 className="text-2xl md:text-3xl font-heading font-bold uppercase mb-6">Review Your Order</h1>

                            <ul className="divide-y divide-gray-100">
                                {cartItems.map((item) => (
                                    <li key={item.uniqueId} className="flex gap-4 py-4">
                                        <div className="relative w-20 h-24 bg-gray-100 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-1" sizes="80px" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-heading font-bold uppercase tracking-tight">{item.name}</p>
                                            <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            {item.oneOfOne && (
                                                <p className="text-xs uppercase tracking-wider text-brand-red mt-1">One of one</p>
                                            )}
                                        </div>
                                        <p className="font-mono">${(item.price * item.quantity).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-100 text-sm">
                                <div className="flex gap-3">
                                    <Truck size={18} className="flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-600">
                                        Choose standard, express or overnight on the next page. Standard is free over ${freeShippingThreshold}.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <ShieldCheck size={18} className="flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-600">Secure payment by Stripe. We never see or store your card details.</p>
                                </div>
                                <div className="flex gap-3">
                                    <Tag size={18} className="flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-600">Have a promo code? Enter it on the payment page.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-28">
                            <h2 className="text-lg font-heading font-bold uppercase mb-6">Order Summary</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-mono">${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Standard shipping</span>
                                    <span className={`font-mono ${shipping === 0 ? "text-green-600" : ""}`}>
                                        {shipping === 0 ? "FREE" : `$${shipping}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="text-gray-500">Calculated at payment</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                                    <span>Estimated total</span>
                                    <span className="font-mono">${total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isRedirecting}
                                className="w-full mt-6 flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                                onMouseEnter={() => setCursorVariant("link")}
                                onMouseLeave={() => setCursorVariant("default")}
                            >
                                {isRedirecting ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Opening checkout…
                                    </>
                                ) : (
                                    <>
                                        <Lock size={16} />
                                        Checkout Securely
                                    </>
                                )}
                            </button>

                            {error && (
                                <p role="alert" className="mt-4 text-sm text-brand-red">
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
