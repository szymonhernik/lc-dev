import { useCustomCheckout } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function PayButton() {
  const { total, confirm, canConfirm, confirmationRequirements } =
    useCustomCheckout();
  const [loading, setLoading] = useState(false);

  console.log('total on Pay button', total);

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
