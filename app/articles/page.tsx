import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function PrivatePage() {
  const supabase = createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  //check if the user has a session
  if (!session) {
    return <p>You are not logged in. (first check)</p>;
  }

  //fetch the user's data
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return <p>Something went wrong</p>;
  }

  // fetch the user's subscription_status
  const { data: userSubscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id);

  if (userSubscription) {
    const isActive = userSubscription[0].status === 'active';
    if (!isActive) {
      return <p>Page preview</p>;
    } else if (isActive) {
      return (
        <>
          <p>Full access</p>
        </>
      );
    }
  }
}
