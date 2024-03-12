'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Account', href: '/account' },
  {
    name: 'Subscription',
    href: '/account/subscription'
  }
];

export default function SideNavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[20px] grow items-center justify-center gap-2 rounded-md bg-inherit p-3 text-sm font-medium  hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'text-white': pathname === link.href
              },
              {
                'text-gray-400': pathname != link.href
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
