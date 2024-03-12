import SideNav from '@/components/ui/SideNav';
import Link from 'next/link';

export default function AccountSettingsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="w-full flex-none md:w-64 fixed top-36 left-">
        <SideNav />
      </div>
      <section className="mb-32 bg-black">{children}</section>;
    </div>
  );
}
