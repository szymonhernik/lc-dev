'use client';
import { getErrorRedirect } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

export default function AuthCodeError() {
  const router = useRouter();

  return router.push(
    getErrorRedirect(
      '/signin',
      'The email link is invalid or has expired.',
      'Please try resetting your password again.'
    )
  );
}
