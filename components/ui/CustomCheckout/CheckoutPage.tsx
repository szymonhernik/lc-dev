import { AddressElement, PaymentElement } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  return (
    <div className="flex flex-col gap-4 ">
      <form>
        <h1 className="text-xl font-bold mb-4">Billing information</h1>
        <AddressElement options={{ mode: 'billing' }} />
      </form>
      <form>
        <h1 className="text-xl font-bold mb-4">Payment information</h1>
        <PaymentElement />
      </form>
    </div>
  );
}
