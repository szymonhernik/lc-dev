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
  // let clientSecret = params.get('clientSecret');

  // Optionally, handle loading state and errors here
  if (!clientSecret) return <div>Loading...</div>;
  // console.log('params', params);
  //   console.log('clientSecret', clientSecret);

  return (
    <>
      <Suspense>
        <CustomCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <CheckoutForm />
        </CustomCheckoutProvider>
      </Suspense>
      <p>test</p>
    </>
  );
}
