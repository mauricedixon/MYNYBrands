"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Package, ArrowRight, Mail, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useCursor } from "@/context/CursorContext";

export default function CheckoutSuccessPage() {
    const { clearCart } = useCart();
    const { setCursorVariant } = useCursor();
    const [orderNumber] = useState(() => `MYNY-${Date.now().toString(36).toUpperCase()}`);

    // Clear cart on success
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Success Animation */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Check className="w-12 h-12 text-white" strokeWidth={3} />
                        </motion.div>
                    </motion.div>

                    {/* Thank You Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-4">
                            Thank You!
                        </h1>
                        <p className="text-xl text-gray-600 mb-2">
                            Your order has been placed successfully.
                        </p>
                        <p className="text-gray-500 mb-8">
                            Order confirmation has been sent to your email.
                        </p>
                    </motion.div>

                    {/* Order Number */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gray-50 rounded-lg p-6 mb-8"
                    >
                        <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Order Number</p>
                        <p className="text-2xl font-mono font-bold">{orderNumber}</p>
                    </motion.div>

                    {/* Next Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    >
                        <div className="p-6 border border-gray-100 rounded-lg">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold uppercase text-sm mb-2">Confirmation Email</h3>
                            <p className="text-sm text-gray-500">Check your inbox for order details</p>
                        </div>

                        <div className="p-6 border border-gray-100 rounded-lg">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold uppercase text-sm mb-2">Preparing Order</h3>
                            <p className="text-sm text-gray-500">We&apos;re getting your items ready</p>
                        </div>

                        <div className="p-6 border border-gray-100 rounded-lg">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold uppercase text-sm mb-2">Track Delivery</h3>
                            <p className="text-sm text-gray-500">You&apos;ll receive tracking info soon</p>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/#shop"
                            className="w-full sm:w-auto bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-brand-red transition-colors flex items-center justify-center gap-2 group"
                            onMouseEnter={() => setCursorVariant("link")}
                            onMouseLeave={() => setCursorVariant("default")}
                        >
                            Continue Shopping
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Help Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-sm text-gray-400 mt-12"
                    >
                        Need help?{" "}
                        <a href="mailto:support@myny.com" className="underline hover:text-black transition-colors">
                            Contact Support
                        </a>
                    </motion.p>
                </div>
            </div>
        </main>
    );
}
