export const FREE_SHIPPING_THRESHOLD = 250;

// Amounts in dollars. Standard is free once the subtotal reaches the threshold.
export const shippingMethods = [
  { id: "standard", label: "Standard Shipping", minDays: 5, maxDays: 7, price: 15 },
  { id: "express", label: "Express Shipping", minDays: 2, maxDays: 3, price: 25 },
  { id: "overnight", label: "Overnight Shipping", minDays: 1, maxDays: 1, price: 45 },
] as const;

export const standardShippingFor = (subtotal: number) =>
  subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shippingMethods[0].price;
