import { useCustomCheckout } from '@stripe/react-stripe-js';

export default function OrderSummary() {
  const { lineItems, taxAmounts, discountAmounts, shipping, currency, total } =
    useCustomCheckout();

  //   console.log('lineItems', lineItems[0].description);
  //   console.log('taxAmounts', taxAmounts);
  // console.log('discountAmounts', discountAmounts);
  // console.log('shipping', shipping);
  console.log('total', total);

  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency!,
    minimumFractionDigits: 0
  }).format((total.subtotal || 0) / 100);

  return (
    <>
      <h1>Order Summary</h1>
      <p>Items: {lineItems[0].name}</p>
      <p>Description: {lineItems[0].description}</p>
      <p>Subtotal: {priceString}</p>
    </>
  );
}
