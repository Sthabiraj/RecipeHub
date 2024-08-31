import Footer from '@/components/layouts/footer/footer';
import NavBar from '@/components/layouts/navbar/nav-bar';

export default function UserRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='flex min-h-screen flex-col'>
      <NavBar />
      <section className='flex-1'>{children}</section>
      <Footer />
    </main>
  );
}
