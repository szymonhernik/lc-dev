'use client';
import React from 'react';
import { CustomCheckoutProvider } from '@stripe/react-stripe-js';
import { useSearchParams } from 'next/navigation';
import { getStripe } from '@/utils/stripe/client';
import CheckoutForm from '@/components/ui/CustomCheckout/CheckoutPage';
import OrderSummary from './OrderSummary';

const stripePromise = getStripe();

export default function CheckoutWrapper() {
  const searchParams = useSearchParams();
  const clientSecret = new URLSearchParams(searchParams).get('clientSecret');

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <div className="">
      <CustomCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <OrderSummary />
        <CheckoutForm />
      </CustomCheckoutProvider>
    </div>
  );
}
