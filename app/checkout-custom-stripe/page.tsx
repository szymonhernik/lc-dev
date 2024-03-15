import React, { Suspense } from 'react';

import CheckoutWrapper from '@/components/ui/CustomCheckout/CheckoutWrapper';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  return (
    <Suspense fallback={null}>
      <CheckoutWrapper />
    </Suspense>
  );
}
