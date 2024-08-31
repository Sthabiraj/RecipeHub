'use client';

import { SVGProps, useState } from 'react';

export default function YoutubeIcon({
  width = 30,
  height = 30,
}: SVGProps<SVGSVGElement>) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <>
      {!isHovering ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={width}
          height={height}
          viewBox='0 0 30 30'
          fill='none'
          onMouseEnter={() => setIsHovering(true)}
        >
          <path
            d='M11.755 8.31333L21.14 21.6867H18.645L9.27667 8.31333H11.755ZM30 5V25C30 27.7617 27.7617 30 25 30H5C2.23833 30 0 27.7617 0 25V5C0 2.23833 2.23833 0 5 0H25C27.7617 0 30 2.23833 30 5ZM24.23 23.3333L17.2533 13.35L22.9567 6.66667H20.7717L16.265 11.9333L12.5867 6.66667H6.17L12.7383 16.055L6.51 23.3333H8.73167L13.7333 17.4733L17.83 23.3333H24.23Z'
            fill='white'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={width}
          height={height}
          viewBox='0 0 30 30'
          fill='none'
          onMouseLeave={() => setIsHovering(false)}
        >
          <rect width={width} height={height} rx='15' fill='white' />
          <path
            d='M11.755 8.31333L21.14 21.6867H18.645L9.27667 8.31333H11.755ZM30 5V25C30 27.7617 27.7617 30 25 30H5C2.23833 30 0 27.7617 0 25V5C0 2.23833 2.23833 0 5 0H25C27.7617 0 30 2.23833 30 5ZM24.23 23.3333L17.2533 13.35L22.9567 6.66667H20.7717L16.265 11.9333L12.5867 6.66667H6.17L12.7383 16.055L6.51 23.3333H8.73167L13.7333 17.4733L17.83 23.3333H24.23Z'
            fill='black'
          />
        </svg>
      )}
    </>
  );
}
