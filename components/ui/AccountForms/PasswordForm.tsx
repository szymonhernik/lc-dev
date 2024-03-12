'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { handleRequest } from '@/utils/auth-helpers/client';
import { updatePasswordInAccount } from '@/utils/auth-helpers/server';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useFormState, useFormStatus } from 'react-dom';

export default function PasswordForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, updatePasswordInAccount, router);

    setIsSubmitting(false);
  };

  return (
    <Card
      title="Update password"
      description="Please enter your new password."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <p className={`pb-4 sm:pb-0 `}>Type new password</p>

          <Button
            variant="slim"
            type="submit"
            loading={isSubmitting}
            form="passwordUpdateForm"
          >
            Update Password
          </Button>
        </div>
      }
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
        <form
          noValidate={true}
          id="passwordUpdateForm"
          className="mb-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid gap-2">
            <div className="grid gap-1">
              <label htmlFor="password">New Password</label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                className="w-full p-3 rounded-md bg-zinc-800"
              />
              <label htmlFor="passwordConfirm">Confirm New Password</label>
              <input
                id="passwordConfirm"
                placeholder="Password"
                type="password"
                name="passwordConfirm"
                autoComplete="current-password"
                className="w-full p-3 rounded-md bg-zinc-800"
              />
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
