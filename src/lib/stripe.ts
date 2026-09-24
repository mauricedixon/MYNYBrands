// Minimal server-side Stripe client using the REST API directly, so card data
// never touches this app: customers pay on Stripe's hosted checkout page.

const STRIPE_API = "https://api.stripe.com/v1";

export const isStripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);

type Params = Record<string, string | number | boolean | undefined>;

async function stripeRequest<T>(method: "GET" | "POST", path: string, params?: Params): Promise<T> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");

  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params ?? {})) {
    if (v !== undefined) body.append(k, String(v));
  }

  const res = await fetch(`${STRIPE_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: method === "POST" ? body : undefined,
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error?.message ?? `Stripe request failed (${res.status})`);
  }
  return json as T;
}

export type CheckoutSession = {
  id: string;
  url: string | null;
  payment_status: "paid" | "unpaid" | "no_payment_required";
  amount_total: number | null;
  customer_details: { email: string | null; name: string | null } | null;
};

export const createCheckoutSession = (params: Params) =>
  stripeRequest<CheckoutSession>("POST", "/checkout/sessions", params);

export const retrieveCheckoutSession = (id: string) =>
  stripeRequest<CheckoutSession>("GET", `/checkout/sessions/${encodeURIComponent(id)}`);
