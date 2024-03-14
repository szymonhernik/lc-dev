import React, { Suspense } from 'react';

import CustomCheckoutPage from '@/components/ui/CustomCheckout/CustomCheckoutPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CustomCheckoutPage />
    </Suspense>
  );
}
