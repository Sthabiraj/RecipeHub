import React from 'react';
import FacebookIcon from '@/components/icons/facebook';
import InstagramIcon from '@/components/icons/instagram';
import PrintestIcon from '@/components/icons/printest';
import XIcon from '@/components/icons/x';
import YoutubeIcon from '@/components/icons/youtube';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Link = {
  name: string;
  href: string;
};

type SocialLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const links: Link[] = [
  { name: 'Recipes', href: '/recipes' },
  { name: 'Articles', href: '/articles' },
  { name: 'Careers', href: '/careers' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact Us', href: '/contact-us' },
];

const legalAndSupportLinks: Link[] = [
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'FAQs', href: '/faqs' },
];

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: <FacebookIcon height={25} width={25} />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: <InstagramIcon height={24} width={24} />,
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com',
    icon: <PrintestIcon height={25} width={25} />,
  },
  {
    name: 'Youtube',
    href: 'https://youtube.com',
    icon: <YoutubeIcon height={18} width={28} />,
  },
  {
    name: 'X',
    href: 'https://x.com',
    icon: <XIcon height={24} width={24} />,
  },
];

export default function Footer() {
  return (
    <footer className='bg-primary px-4 pt-8 text-primary-foreground sm:px-6 md:px-8 md:pt-16 lg:px-24'>
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0'>
        <div className='space-y-4'>
          <h1 className='font-bold uppercase'>Links</h1>
          <div className='flex flex-col gap-1'>
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'block h-fit p-0 text-left text-sm font-light text-inherit'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className='space-y-4'>
          <h1 className='font-bold uppercase'>Legal & Support</h1>
          <div className='flex flex-col gap-1'>
            {legalAndSupportLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'block h-fit p-0 text-left text-sm font-light text-inherit'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className='space-y-4'>
          <h1 className='font-bold uppercase'>Follow Us</h1>
          <div className='flex items-center gap-4'>
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
        <div className='space-y-4'>
          <h1 className='font-bold uppercase'>Sign up for our newsletter</h1>
          <p className='text-sm font-light leading-6'>
            Subscribe & start receiving your weekly dose of delicious
            inspiration!
          </p>
          <div className='flex overflow-hidden rounded-full border bg-primary-foreground'>
            <Input
              placeholder='name@domain.com'
              className='flex-grow rounded-none rounded-l-full text-accent-foreground'
            />
            <Button className='rounded-none'>Subscribe</Button>
          </div>
        </div>
      </div>
      <div className='mt-8 border-t py-3 text-center text-sm md:mt-10'>
        &copy; 2024 Brand. All rights reserved.
      </div>
    </footer>
  );
}
