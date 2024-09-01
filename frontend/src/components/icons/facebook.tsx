import { SVGProps } from 'react';

export default function FacebookIcon({
  width = 34,
  height = 34,
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 34 34'
      fill='none'
      className='group'
      aria-label='Facebook'
      role='img'
    >
      <rect
        x='0.333008'
        y='0.332031'
        width='33.3333'
        height='33.25'
        rx='16.625'
        className='fill-transparent transition-colors duration-200 group-hover:fill-white'
      />
      <path
        d='M33.6663 16.9987C33.6663 7.7987 26.1997 0.332031 16.9997 0.332031C7.79967 0.332031 0.333008 7.7987 0.333008 16.9987C0.333008 25.0654 6.06634 31.782 13.6663 33.332V21.9987H10.333V16.9987H13.6663V12.832C13.6663 9.61536 16.283 6.9987 19.4997 6.9987H23.6663V11.9987H20.333C19.4163 11.9987 18.6663 12.7487 18.6663 13.6654V16.9987H23.6663V21.9987H18.6663V33.582C27.083 32.7487 33.6663 25.6487 33.6663 16.9987Z'
        className='fill-primary-foreground transition-colors duration-200 group-hover:fill-[#1877F2]'
      />
    </svg>
  );
}
