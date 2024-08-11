import NavBar from '@/components/ui/nav-bar';

export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen'>
      <NavBar />
      {children}
    </main>
  );
}
