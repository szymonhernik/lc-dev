import { getStatusRedirect } from '@/utils/helpers';
import { useCustomCheckout } from '@stripe/react-stripe-js';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';

import { use, useEffect, useState } from 'react';

export default function PayButton() {
  const { total, confirm, canConfirm, confirmationRequirements } =
    useCustomCheckout();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    confirm().then(() => {
      setLoading(false);

      return router.push('/payment-success');
    });
  };

  return (
    <button disabled={!canConfirm || loading} onClick={handleClick}>
      {loading ? 'Processing' : 'Pay'}
    </button>
  );
}
