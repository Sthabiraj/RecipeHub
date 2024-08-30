import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='min-h-screen bg-[#0D0C0C] lg:grid lg:grid-cols-2'>
      <figure className='relative hidden lg:block lg:h-full'>
        <Image
          src={
            'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt='Food Image'
          className='object-cover'
          loading='eager'
          priority
          quality={100}
          fill
          sizes='50vw'
          placeholder='blur'
          blurDataURL='https://utfs.io/f/855c288a-a77f-4af1-addc-652a473eab48-1nq2cb.webp'
        />
        <div className='absolute inset-0 bg-black/50' />
      </figure>
      {children}
    </main>
  );
}
