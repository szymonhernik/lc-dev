'use client';
import { getStatusRedirect } from '@/utils/helpers';
import { useCustomCheckout } from '@stripe/react-stripe-js';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export default function PayButton() {
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
    <>
      <button disabled={!canConfirm || loading} onClick={handleClick}>
        {loading ? 'Processing' : 'Pay'}
      </button>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: 'block' } : {}}
      >
        {messageBody}
      </div>
    </>
  );
}
