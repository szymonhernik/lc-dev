import React, { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense fallback={null}>
      <div className="text-green-400">Your payment was successfull</div>
    </Suspense>
  );
}
