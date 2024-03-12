import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function NotificationPage() {
  return (
    <>
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Notifications
          </h1>
        </div>
      </div>
      <div className="p-4"></div>
    </>
  );
}
