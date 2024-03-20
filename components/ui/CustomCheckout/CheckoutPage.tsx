'use client';
import {
  AddressElement,
  PaymentElement,
  useCustomCheckout
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../Button';

export default function CheckoutForm() {
  const { confirm, canConfirm, confirmationRequirements } = useCustomCheckout();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const handleClick = async () => {
    setLoading(true);
    //  confirm() method returns a Promise that resolves to an object with one of the following types
    //  { session: CheckoutSession }
    //  { error: StripeError }
    confirm().then((result) => {
      setLoading(false);
      if (result.session) {
        return router.push('/payment-success');
        // console.log('success');
      } else {
        // Use result.error
        setMessageBody(result.error.message || 'An error occurred');
      }
    });
  };
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-xl font-bold mb-4">Billing information</h1>
      <form>
        <AddressElement options={{ mode: 'billing' }} />
      </form>
      <h1 className="text-xl font-bold mb-4">Payment information</h1>
      <form>
        <PaymentElement />
        <Button
          variant="slim"
          className="mt-16"
          loading={loading}
          disabled={!canConfirm || loading}
          onClick={handleClick}
        >
          {loading ? 'Processing' : 'Pay'}
        </Button>
        <div
          id="messages"
          role="alert"
          style={messageBody ? { display: 'block' } : {}}
        >
          {messageBody}
        </div>
      </form>
    </div>
  );
}
