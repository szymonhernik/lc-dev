'use client';
import React from 'react';
import { CustomCheckoutProvider } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import { getStripe } from '@/utils/stripe/client';
import CheckoutForm from '@/components/ui/CustomCheckout/CheckoutPage';
// import OrderSummary from './OrderSummary';
import { Stripe } from '@stripe/stripe-js';

const stripePromise = getStripe();

export default function ModalCheckout({
  clientSecret,
  stripe
}: {
  clientSecret: string;
  stripe: Stripe | null;
}) {
  return (
    <div className="fixed inset-0 z-[50] overflow-auto bg-stone-900 bg-opacity-80 flex">
      <div className="relative p-8 bg-black w-full max-w-md m-auto flex-col flex rounded-lg">
        {!clientSecret ? (
          <div>Session unknown. Please try subscribing again.</div>
        ) : (
          <CustomCheckoutProvider stripe={stripe} options={{ clientSecret }}>
            <div className="flex flex-col gap-8">
              {/* <OrderSummary /> */}
              <CheckoutForm />
            </div>
          </CustomCheckoutProvider>
        )}

        {/* <h1>Custom checkout</h1> */}
      </div>
    </div>
  );
}
