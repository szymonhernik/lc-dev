'use client';
import React from 'react';
import { CustomCheckoutProvider } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import { getStripe } from '@/utils/stripe/client';
import CheckoutForm from '@/components/ui/CustomCheckout/CheckoutPage';
import OrderSummary from './OrderSummary';
import PayButton from './PayButton';

const stripePromise = getStripe();

export default function CheckoutWrapper() {
  const searchParams = useSearchParams();
  const clientSecret = new URLSearchParams(searchParams).get('clientSecret');

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-lg py-64">
      <CustomCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <div className="flex flex-col gap-8">
          <OrderSummary />
          <CheckoutForm />
          <PayButton />
        </div>
      </CustomCheckoutProvider>
    </div>
  );
}
