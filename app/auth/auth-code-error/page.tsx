import Link from 'next/link';

export default function Page() {
  return (
    <>
      <p>The authentification couldn't be completed.</p>
      <Link href="/signin" className="underline">
        Sign in
      </Link>
    </>
  );
}
