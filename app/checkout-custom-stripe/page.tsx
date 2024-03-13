'use client';
import React, { useEffect, useState } from 'react';
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
  const router = useRouter();

  const searchParams = useSearchParams();
  let clientSecret = searchParams.get('clientSecret');

  // Optionally, handle loading state and errors here
  if (!clientSecret) return <div>Loading...</div>;
  //   console.log('searchParams', searchParams);
  //   console.log('clientSecret', clientSecret);

  return (
    <CustomCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </CustomCheckoutProvider>
    // <p>test</p>
  );
}
