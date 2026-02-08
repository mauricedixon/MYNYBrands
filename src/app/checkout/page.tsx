"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    CreditCard,
    Truck,
    Package,
    Lock,
    ShieldCheck
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useCursor } from "@/context/CursorContext";

type CheckoutStep = "information" | "shipping" | "payment" | "review";

const steps: { id: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    { id: "information", label: "Information", icon: <Package size={18} /> },
    { id: "shipping", label: "Shipping", icon: <Truck size={18} /> },
    { id: "payment", label: "Payment", icon: <CreditCard size={18} /> },
    { id: "review", label: "Review", icon: <Check size={18} /> },
];

export default function CheckoutPage() {
    const { cartItems, subtotal, shipping, total, freeShippingThreshold } = useCart();
    const { setCursorVariant } = useCursor();
    const [currentStep, setCurrentStep] = useState<CheckoutStep>("information");
    const [isProcessing, setIsProcessing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        shippingMethod: "standard",
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
        cardName: "",
    });

    const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const nextStep = () => {
        const currentIndex = steps.findIndex((s) => s.id === currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1].id);
        }
    };

    const prevStep = () => {
        const currentIndex = steps.findIndex((s) => s.id === currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1].id);
        }
    };

    const handleSubmitOrder = async () => {
        setIsProcessing(true);
        // Simulate processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Redirect to success page
        window.location.href = "/checkout/success";
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
                {/* Progress Steps */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const isActive = step.id === currentStep;
                            const isCompleted = index < currentStepIndex;

                            return (
                                <div key={step.id} className="flex items-center flex-1">
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            animate={{
                                                scale: isActive ? 1.1 : 1,
                                                backgroundColor: isCompleted ? "#000" : isActive ? "#000" : "#e5e5e5",
                                            }}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isCompleted || isActive ? "text-white" : "text-gray-400"
                                                }`}
                                        >
                                            {isCompleted ? <Check size={18} /> : step.icon}
                                        </motion.div>
                                        <span
                                            className={`mt-2 text-xs font-medium uppercase tracking-wider ${isActive ? "text-black" : "text-gray-400"
                                                }`}
                                        >
                                            {step.label}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 h-px bg-gray-200 mx-4">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: isCompleted ? "100%" : "0%" }}
                                                className="h-full bg-black"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-8">
                            <AnimatePresence mode="wait">
                                {/* Information Step */}
                                {currentStep === "information" && (
                                    <motion.div
                                        key="information"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 className="text-xl font-heading font-bold uppercase mb-6">Contact & Shipping</h2>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                                                    placeholder="you@example.com"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                                                    placeholder="Street address"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                    Apartment, suite, etc. (optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="apartment"
                                                    value={formData.apartment}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                                                />
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                        State
                                                    </label>
                                                    <select
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors bg-white"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="NY">New York</option>
                                                        <option value="CA">California</option>
                                                        <option value="TX">Texas</option>
                                                        <option value="FL">Florida</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                        ZIP Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="zip"
                                                        value={formData.zip}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                    Phone (for delivery updates)
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Shipping Step */}
                                {currentStep === "shipping" && (
                                    <motion.div
                                        key="shipping"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 className="text-xl font-heading font-bold uppercase mb-6">Shipping Method</h2>

                                        <div className="space-y-4">
                                            {[
                                                { id: "standard", label: "Standard Shipping", time: "5-7 business days", price: subtotal >= freeShippingThreshold ? 0 : 15 },
                                                { id: "express", label: "Express Shipping", time: "2-3 business days", price: 25 },
                                                { id: "overnight", label: "Overnight Shipping", time: "Next business day", price: 45 },
                                            ].map((method) => (
                                                <label
                                                    key={method.id}
                                                    className={`flex items-center justify-between p-4 border-2 cursor-pointer transition-all ${formData.shippingMethod === method.id
                                                            ? "border-black bg-gray-50"
                                                            : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <input
                                                            type="radio"
                                                            name="shippingMethod"
                                                            value={method.id}
                                                            checked={formData.shippingMethod === method.id}
                                                            onChange={handleInputChange}
                                                            className="w-4 h-4 accent-black"
                                                        />
                                                        <div>
                                                            <p className="font-medium">{method.label}</p>
                                                            <p className="text-sm text-gray-500">{method.time}</p>
                                                        </div>
                                                    </div>
                                                    <span className="font-mono font-medium">
                                                        {method.price === 0 ? "FREE" : `$${method.price}`}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Payment Step */}
                                {currentStep === "payment" && (
                                    <motion.div
                                        key="payment"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-heading font-bold uppercase">Payment</h2>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Lock size={14} />
                                                <span>Secure & Encrypted</span>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors font-mono"
                                                    placeholder="1234 5678 9012 3456"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                    Name on Card
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                        Expiration
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cardExpiry"
                                                        value={formData.cardExpiry}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors font-mono"
                                                        placeholder="MM / YY"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                                                        Security Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cardCvc"
                                                        value={formData.cardCvc}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:ring-0 transition-colors font-mono"
                                                        placeholder="CVC"
                                                    />
                                                </div>
                                            </div>

                                            {/* Trust badges */}
                                            <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <ShieldCheck size={16} />
                                                    <span>SSL Secured</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <CreditCard size={16} />
                                                    <span>Visa, Mastercard, Amex</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Review Step */}
                                {currentStep === "review" && (
                                    <motion.div
                                        key="review"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 className="text-xl font-heading font-bold uppercase mb-6">Review Your Order</h2>

                                        <div className="space-y-6">
                                            {/* Shipping Info */}
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                                                    Shipping To
                                                </h3>
                                                <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                                                <p className="text-gray-600">{formData.address}</p>
                                                <p className="text-gray-600">{formData.city}, {formData.state} {formData.zip}</p>
                                            </div>

                                            {/* Payment Info */}
                                            <div className="p-4 bg-gray-50 rounded-lg">
                                                <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">
                                                    Payment Method
                                                </h3>
                                                <p className="font-mono">•••• •••• •••• {formData.cardNumber.slice(-4) || "****"}</p>
                                            </div>

                                            {/* Items */}
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-gray-500">
                                                    Items ({cartItems.length})
                                                </h3>
                                                <div className="space-y-4">
                                                    {cartItems.map((item) => (
                                                        <div key={item.uniqueId} className="flex gap-4">
                                                            <div className="relative w-16 h-20 bg-gray-100">
                                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-medium text-sm">{item.name}</p>
                                                                <p className="text-xs text-gray-500">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                                                            </div>
                                                            <p className="font-mono">${(item.price * item.quantity).toLocaleString()}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStepIndex === 0}
                                    className={`flex items-center gap-2 text-sm uppercase tracking-widest transition-colors ${currentStepIndex === 0 ? "text-gray-300 cursor-not-allowed" : "hover:text-brand-red"
                                        }`}
                                    onMouseEnter={() => setCursorVariant("link")}
                                    onMouseLeave={() => setCursorVariant("default")}
                                >
                                    <ArrowLeft size={16} />
                                    Back
                                </button>

                                {currentStep === "review" ? (
                                    <button
                                        onClick={handleSubmitOrder}
                                        disabled={isProcessing}
                                        className="flex items-center gap-2 bg-brand-red text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-black transition-colors disabled:opacity-50"
                                        onMouseEnter={() => setCursorVariant("link")}
                                        onMouseLeave={() => setCursorVariant("default")}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Place Order
                                                <Lock size={16} />
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        onClick={nextStep}
                                        className="flex items-center gap-2 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-brand-red transition-colors"
                                        onMouseEnter={() => setCursorVariant("link")}
                                        onMouseLeave={() => setCursorVariant("default")}
                                    >
                                        Continue
                                        <ArrowRight size={16} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-28">
                            <h2 className="text-lg font-heading font-bold uppercase mb-6">Order Summary</h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.uniqueId} className="flex gap-3">
                                        <div className="relative w-14 h-16 bg-gray-100 flex-shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                                        </div>
                                        <p className="text-sm font-mono">${(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Promo Code */}
                            <div className="flex gap-2 mb-6">
                                <input
                                    type="text"
                                    placeholder="Promo code"
                                    className="flex-1 px-4 py-2 border border-gray-200 text-sm focus:border-black focus:ring-0"
                                />
                                <button className="px-4 py-2 bg-gray-100 text-sm font-medium hover:bg-gray-200 transition-colors">
                                    Apply
                                </button>
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 pt-4 border-t border-gray-100">
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
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
