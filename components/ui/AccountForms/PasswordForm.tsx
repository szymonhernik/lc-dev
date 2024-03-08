'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import {
  updateName,
  updatePassword,
  updatePasswordInAccount
} from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormState } from 'react-dom';

interface UpdatePasswordProps {
  redirectMethod: string;
}
export default function PasswordForm() {
  const initialState = { message: '' };
  const [state, formAction] = useFormState(
    updatePasswordInAccount,
    initialState
  );

  return (
    <Card
      title="Update password"
      description="Please enter your new password."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          {state.message && (
            <p
              className={`pb-4 sm:pb-0 ${state.error ? 'text-red-500' : 'text-green-500'}`}
            >
              {state.message}
            </p>
          )}
          <Button
            variant="slim"
            type="submit"
            loading={state.pending}
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
          action={formAction} // Use formAction for the form's action prop
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
