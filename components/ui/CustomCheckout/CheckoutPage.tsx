'use client';
import {
  AddressElement,
  PaymentElement,
  useCustomCheckout
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../Button';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { getStatusRedirect } from '@/utils/helpers';

export default function CheckoutForm() {
  const { confirm, canConfirm, confirmationRequirements, lineItems, currency } =
    useCustomCheckout();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency!,
    minimumFractionDigits: 0
  }).format((lineItems[0]?.unitAmount || 0) / 100);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // if can't confirm don't allow form submission
    if (!canConfirm) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    e.preventDefault();
    setIsSubmitting(true);

    //  confirm() method returns a Promise that resolves to an object with one of the following types
    //  { session: CheckoutSession }
    //  { error: StripeError }
    confirm().then((result) => {
      setIsSubmitting(false);
      if (result.session) {
        setIsSuccess(true);
        // router.refresh();
        // return getStatusRedirect(
        //   '/account/subscription',
        //   'success',
        //   ' success',
        //   true
        // );

        // return router.refresh();
        // return router.refresh().then(() => router.push('/account/subscriptions'));
      } else {
        setMessageBody(result.error.message || 'An error occurred');
      }
    });
  };
  return (
    <div className="flex flex-col gap-4 ">
      {!isSuccess ? (
        <>
          <div className="mb-8">
            <h1 className="font-bold text-xl mb-4">Order Summary</h1>
            <div className="bg-zinc-900 rounded p-4  w-3/4">
              <p>{lineItems[0]?.name}</p>

              <div className="font-bold flex justify-between">
                <p>Subtotal</p> <p>{priceString}</p>
              </div>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-xl font-bold mb-4">Billing information</h1>
            <AddressElement options={{ mode: 'billing' }} />
            <h1 className="text-xl font-bold mt-8 mb-4">Payment information</h1>
            <PaymentElement />
            <div
              id="messages"
              role="alert"
              style={messageBody ? { display: 'block' } : {}}
            >
              {messageBody}
            </div>
            <Button
              variant="slim"
              className="mt-16"
              loading={isSubmitting}
              disabled={!canConfirm || isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Processing' : 'Pay'}
            </Button>
          </form>
        </>
      ) : (
        <div>
          <h1 className="text-xl font-bold mb-4">Success</h1>
          <p>Your payment was successful.</p>
          <div className="flex flex-col underline">
            <Link href="/account">Go to account</Link>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              Close
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
