import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.log(error);
    return <p>You have no active subscription</p>;
  }
  console.log('subscription', subscription);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome {user.email}</p>
      <p>Your subscription tier: {subscription?.prices?.products?.name}</p>

      <p>Protected content for active subscribers only.</p>
    </div>
  );
}
