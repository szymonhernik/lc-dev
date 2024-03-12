import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function PrivatePage() {
  const supabase = createClient();
  const { data: subscription, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (subscriptionError) {
    console.log(subscriptionError);
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return <p>Page preview</p>;
  } else {
    return (
      <>
        <p>Full access</p>
        <p>
          You are currently on the {subscription?.prices?.products?.name} plan.
        </p>
      </>
    );
  }
}
