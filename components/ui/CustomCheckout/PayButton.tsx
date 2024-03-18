import { useCustomCheckout } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function PayButton() {
  const { confirm, canConfirm, confirmationRequirements } = useCustomCheckout();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    confirm().then(() => {
      setLoading(false);
    });
  };

  return (
    <button disabled={!canConfirm || loading} onClick={handleClick}>
      Pay
    </button>
  );
}
