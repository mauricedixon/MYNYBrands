import Link from "next/link";
import { Check, Package, ArrowRight, Mail, MapPin, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { retrieveCheckoutSession, isStripeConfigured, type CheckoutSession } from "@/lib/stripe";
import { ClearCart } from "./ClearCart";

export const dynamic = "force-dynamic";

async function getPaidSession(sessionId: string | undefined): Promise<CheckoutSession | null> {
    if (!sessionId || !isStripeConfigured()) return null;
    try {
        const session = await retrieveCheckoutSession(sessionId);
        return session.payment_status === "paid" ? session : null;
    } catch {
        return null;
    }
}

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { session_id } = await searchParams;
    const session = await getPaidSession(session_id);

    if (!session) {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <div className="container mx-auto px-6 pt-32 pb-20">
                    <div className="max-w-xl mx-auto text-center">
                        <AlertCircle className="w-12 h-12 mx-auto mb-6 text-gray-400" />
                        <h1 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight mb-4">
                            We couldn&apos;t confirm this order
                        </h1>
                        <p className="text-gray-600 mb-8">
                            No completed payment was found for this link. If you were charged, check your email for a
                            receipt from Stripe and contact us with it.
                        </p>
                        <Link
                            href="/checkout"
                            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-brand-red transition-colors"
                        >
                            Back to Checkout
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const orderNumber = `MYNY-${session.id.slice(-8).toUpperCase()}`;
    const email = session.customer_details?.email;

    return (
        <main className="min-h-screen bg-white">
            <ClearCart />
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Check className="w-12 h-12 text-white" strokeWidth={3} />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-4">
                        Thank You!
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">Your order is confirmed.</p>
                    <p className="text-gray-500 mb-8">
                        {email ? <>A receipt is on its way to <strong>{email}</strong>.</> : "A receipt is on its way to your email."}
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-8">
                        <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Order Number</p>
                        <p className="text-2xl font-mono font-bold">{orderNumber}</p>
                        {session.amount_total != null && (
                            <p className="text-sm text-gray-500 mt-2 font-mono">
                                ${(session.amount_total / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })} paid
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 border border-gray-100 rounded-lg">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-5 h-5" />
                            </div>
                            <h2 className="font-bold uppercase text-sm mb-2">Receipt</h2>
                            <p className="text-sm text-gray-500">Check your inbox for order details</p>
                        </div>
                        <div className="p-6 border border-gray-100 rounded-lg">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-5 h-5" />
                            </div>
                            <h2 className="font-bold uppercase text-sm mb-2">Preparing Order</h2>
                            <p className="text-sm text-gray-500">We&apos;re getting your items ready</p>
                        </div>
                        <div className="p-6 border border-gray-100 rounded-lg">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h2 className="font-bold uppercase text-sm mb-2">Track Delivery</h2>
                            <p className="text-sm text-gray-500">You&apos;ll receive tracking info when it ships</p>
                        </div>
                    </div>

                    <Link
                        href="/#shop"
                        className="inline-flex w-full sm:w-auto bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-brand-red transition-colors items-center justify-center gap-2 group"
                    >
                        Continue Shopping
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
