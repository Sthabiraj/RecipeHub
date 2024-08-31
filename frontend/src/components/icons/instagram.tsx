'use client';

import { SVGProps, useState } from 'react';

export default function InstagramIcon({
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
          onMouseLeave={() => setIsHovering(false)}
        >
          <path
            d='M8.33333 0C3.73167 0 0 3.73167 0 8.33333V21.6667C0 26.2683 3.73167 30 8.33333 30H21.6667C26.2683 30 30 26.2683 30 21.6667V8.33333C30 3.73167 26.2683 0 21.6667 0H8.33333ZM25 3.33333C25.92 3.33333 26.6667 4.08 26.6667 5C26.6667 5.92 25.92 6.66667 25 6.66667C24.08 6.66667 23.3333 5.92 23.3333 5C23.3333 4.08 24.08 3.33333 25 3.33333ZM15 6.66667C19.6017 6.66667 23.3333 10.3983 23.3333 15C23.3333 19.6017 19.6017 23.3333 15 23.3333C10.3983 23.3333 6.66667 19.6017 6.66667 15C6.66667 10.3983 10.3983 6.66667 15 6.66667ZM15 10C13.6739 10 12.4021 10.5268 11.4645 11.4645C10.5268 12.4021 10 13.6739 10 15C10 16.3261 10.5268 17.5979 11.4645 18.5355C12.4021 19.4732 13.6739 20 15 20C16.3261 20 17.5979 19.4732 18.5355 18.5355C19.4732 17.5979 20 16.3261 20 15C20 13.6739 19.4732 12.4021 18.5355 11.4645C17.5979 10.5268 16.3261 10 15 10Z'
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
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <rect width='30' height='30' rx='9' fill='white' />
          <path
            d='M8.33333 0C3.73167 0 0 3.73167 0 8.33333V21.6667C0 26.2683 3.73167 30 8.33333 30H21.6667C26.2683 30 30 26.2683 30 21.6667V8.33333C30 3.73167 26.2683 0 21.6667 0H8.33333ZM25 3.33333C25.92 3.33333 26.6667 4.08 26.6667 5C26.6667 5.92 25.92 6.66667 25 6.66667C24.08 6.66667 23.3333 5.92 23.3333 5C23.3333 4.08 24.08 3.33333 25 3.33333ZM15 6.66667C19.6017 6.66667 23.3333 10.3983 23.3333 15C23.3333 19.6017 19.6017 23.3333 15 23.3333C10.3983 23.3333 6.66667 19.6017 6.66667 15C6.66667 10.3983 10.3983 6.66667 15 6.66667ZM15 10C13.6739 10 12.4021 10.5268 11.4645 11.4645C10.5268 12.4021 10 13.6739 10 15C10 16.3261 10.5268 17.5979 11.4645 18.5355C12.4021 19.4732 13.6739 20 15 20C16.3261 20 17.5979 19.4732 18.5355 18.5355C19.4732 17.5979 20 16.3261 20 15C20 13.6739 19.4732 12.4021 18.5355 11.4645C17.5979 10.5268 16.3261 10 15 10Z'
            fill='url(#paint0_linear_54_454)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_54_454'
              x1='30'
              y1='-6.66666'
              x2='4.16667'
              y2='35'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#2F46F4' />
              <stop offset='0.11' stop-color='#4831E3' />
              <stop offset='0.205' stop-color='#802CC2' />
              <stop offset='0.305' stop-color='#C72785' />
              <stop offset='0.42' stop-color='#E52765' />
              <stop offset='0.53' stop-color='#ED253A' />
              <stop offset='0.645' stop-color='#EF4738' />
              <stop offset='0.755' stop-color='#F26931' />
              <stop offset='0.875' stop-color='#F8B147' />
              <stop offset='1' stop-color='#FBE186' />
            </linearGradient>
          </defs>
        </svg>
      )}
    </>
  );
}
