import { PaymentElement } from '@stripe/react-stripe-js';

export default function CheckoutForm() {
  return (
    <div className="max-w-md mx-auto mt-64">
      <form>
        <PaymentElement />
      </form>
    </div>
  );
}
