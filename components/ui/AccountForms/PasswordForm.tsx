'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { updatePasswordInAccountForm } from '@/utils/auth-helpers/server';
import { useEffect, useRef, useState } from 'react';

import { useFormState, useFormStatus } from 'react-dom';

export default function PasswordForm() {
  const initialState = { message: '', error: false };

  const { pending, data, method, action } = useFormStatus();
  const [state, formAction] = useFormState(
    updatePasswordInAccountForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   // Check if there's a success and the form reference exists
  //   if (state.success && formRef.current) {
  //     formRef.current.reset(); // Reset form only on success
  //   }
  // }, [state.success]); // Dependency array includes state.success to react on its change

  return (
    <Card
      title="Update password"
      description="Please enter your new password."
      footer={
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          {state.message ? (
            <p
              className={`pb-4 sm:pb-0 ${state.error ? 'text-red-500' : 'text-green-500'}`}
            >
              {state.message}
            </p>
          ) : (
            <p className={`pb-4 sm:pb-0 `}></p>
          )}
          <Button
            variant="slim"
            type="submit"
            loading={pending}
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
          ref={formRef}
          action={formAction}
          // action={async (formData) => {
          //   await formAction(formData);
          // }}
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
