import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { shippingMethods, standardShippingFor } from "@/data/shipping";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";

type RequestItem = { id: number; size: string; quantity: number };

const MAX_QUANTITY = 10;

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Checkout isn't connected yet. Please check back soon." },
      { status: 503 }
    );
  }

  let items: RequestItem[];
  try {
    ({ items } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Prices, sizes, and quantity limits come from the catalog, never from the browser.
  const params: Record<string, string | number | boolean | undefined> = {};
  let subtotal = 0;

  for (const [i, item] of items.entries()) {
    const product = products.find((p) => p.id === Number(item.id));
    const sizes = product?.sizes ?? ["S", "M", "L", "XL"];
    const maxQty = product?.oneOfOne ? 1 : MAX_QUANTITY;
    const quantity = Math.floor(Number(item.quantity));

    if (!product || !sizes.includes(item.size) || !(quantity >= 1 && quantity <= maxQty)) {
      return NextResponse.json(
        { error: "One of the items in your cart is no longer available. Please review your cart." },
        { status: 400 }
      );
    }

    subtotal += product.price * quantity;
    const li = `line_items[${i}]`;
    params[`${li}[quantity]`] = quantity;
    params[`${li}[price_data][currency]`] = "usd";
    params[`${li}[price_data][unit_amount]`] = product.price * 100;
    params[`${li}[price_data][product_data][name]`] = product.name;
    params[`${li}[price_data][product_data][description]`] = `Size: ${item.size}`;
    params[`${li}[price_data][product_data][metadata][product_id]`] = product.id;
    params[`${li}[price_data][product_data][metadata][size]`] = item.size;
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      params[`${li}[price_data][product_data][images][0]`] = new URL(
        product.image,
        process.env.NEXT_PUBLIC_SITE_URL
      ).toString();
    }
  }

  shippingMethods.forEach((method, i) => {
    const so = `shipping_options[${i}][shipping_rate_data]`;
    const amount = method.id === "standard" ? standardShippingFor(subtotal) : method.price;
    params[`${so}[type]`] = "fixed_amount";
    params[`${so}[display_name]`] = amount === 0 ? `${method.label} (Free)` : method.label;
    params[`${so}[fixed_amount][amount]`] = amount * 100;
    params[`${so}[fixed_amount][currency]`] = "usd";
    params[`${so}[delivery_estimate][minimum][unit]`] = "business_day";
    params[`${so}[delivery_estimate][minimum][value]`] = method.minDays;
    params[`${so}[delivery_estimate][maximum][unit]`] = "business_day";
    params[`${so}[delivery_estimate][maximum][value]`] = method.maxDays;
  });

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;

  try {
    const session = await createCheckoutSession({
      ...params,
      mode: "payment",
      "shipping_address_collection[allowed_countries][0]": "US",
      "phone_number_collection[enabled]": true,
      allow_promotion_codes: true,
      "automatic_tax[enabled]": process.env.STRIPE_AUTOMATIC_TAX === "true" ? true : undefined,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session failed:", error);
    return NextResponse.json(
      { error: "We couldn't start checkout. Please try again in a moment." },
      { status: 502 }
    );
  }
}
