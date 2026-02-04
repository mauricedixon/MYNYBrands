"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCursor } from "@/context/CursorContext";

export const CartSidebar = () => {
  const { cartItems, isCartOpen, toggleCart, removeFromCart, clearCart } = useCart();
  const { setCursorVariant } = useCursor();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black z-[60] cursor-pointer"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-xl font-heading font-bold uppercase tracking-wide">
                Your Cart ({cartItems.length})
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <span className="text-lg">Your bag is empty.</span>
                  <button
                    onClick={toggleCart}
                    className="text-black underline uppercase text-xs font-bold tracking-widest hover:text-brand-red transition-colors"
                    onMouseEnter={() => setCursorVariant("link")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.uniqueId} className="flex gap-4">
                    <div className="relative w-20 h-24 bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm uppercase leading-tight pr-4">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.uniqueId)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            onMouseEnter={() => setCursorVariant("link")}
                            onMouseLeave={() => setCursorVariant("default")}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                          Size: {item.selectedSize}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="font-mono text-sm">
                          ${item.price * item.quantity}
                        </span>
                        <div className="text-xs text-gray-500">
                            Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium uppercase tracking-wide text-gray-500">
                    Subtotal
                  </span>
                  <span className="text-xl font-bold font-mono">
                    ${totalPrice}
                  </span>
                </div>
                <button
                  className="w-full bg-black text-white py-4 font-bold font-heading uppercase tracking-widest hover:bg-brand-red transition-colors"
                  onMouseEnter={() => setCursorVariant("link")}
                  onMouseLeave={() => setCursorVariant("default")}
                  onClick={() => alert("Checkout coming soon!")}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
