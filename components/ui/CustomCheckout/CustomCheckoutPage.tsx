'use client';
import React, { Suspense, useEffect, useState } from 'react';
import {
  CustomCheckoutProvider,
  PaymentElement,
  useCustomCheckout
} from '@stripe/react-stripe-js';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getStripe } from '@/utils/stripe/client';
import CheckoutForm from '@/components/ui/CustomCheckout/CheckoutPage';

const stripePromise = getStripe();

export default function CustomCheckoutPage() {
  const searchParams = useSearchParams();
  const clientSecret = new URLSearchParams(searchParams).get('clientSecret');

  if (!clientSecret) return <div>Loading...</div>;

  return (
    <>
      <CustomCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </CustomCheckoutProvider>

      <p>test</p>
    </>
  );
}
