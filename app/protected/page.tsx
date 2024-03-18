import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import articles from '@/sampleData';

// Define a type for the subscription tiers
type SubscriptionTier = 'hobby' | 'supporter' | 'professional';
type Tiers = {
  [key in SubscriptionTier]: number;
};

// Define the tiers with explicit types
const tiers: Tiers = {
  hobby: 1,
  supporter: 2,
  professional: 3
};

export default async function ProtectedPage() {
  const supabase = createClient();
  const articleId = 3;

  const {
    data: { user }
  } = await supabase.auth.getUser();
  // console.log('articles', articles);

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
  }

  const article = articles.find((a) => a.id === articleId);

  // Check if the article exists
  if (!article) {
    return <div>Article not found.</div>;
  }

  // subscription?.prices?.products?.name is a string that matches a SubscriptionTier
  // Ensure the value exists and is a key of tiers before accessing  const tiers: Tiers = { hobby: 1, supporter: 2, professional: 3 };
  const userTierKey = subscription?.prices?.products?.name?.toLowerCase() as
    | SubscriptionTier
    | undefined;
  const userTier = userTierKey ? tiers[userTierKey] : undefined;

  // ensure that the requiredSubscriptionTier from the article is a valid key
  const requiredTier = article.requiredSubscriptionTier as SubscriptionTier;
  const requiredTierValue = tiers[requiredTier];

  if (userTier === undefined || userTier < requiredTierValue) {
    return (
      <div>
        You do not have the required subscription tier to access this article.
        You need to be at least a {article.requiredSubscriptionTier} subscriber.
      </div>
    );
  }

  return (
    <div>
      <h1>Protected Article {articleId}</h1>
      <p>Welcome {user.email}</p>
      <p>Your subscription tier: {subscription?.prices?.products?.name}</p>
      <p>Protected content for active subscribers only.</p>
    </div>
  );
}
