'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
  showValue?: boolean;
}

export function RatingComponent({
  initialRating = 0,
  onChange,
  readOnly = false,
  size = 5,
  showValue = false,
}: RatingProps = {}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (newRating: number) => {
    if (!readOnly) {
      setRating(newRating);
      if (onChange) {
        onChange(newRating);
      }
    }
  };

  return (
    <div className='flex items-center space-x-2'>
      <div className='flex items-center space-x-1'>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            aria-label={`Rate ${star} stars out of 5`}
            disabled={readOnly}
          >
            <Star
              className={cn(
                `h-${size} w-${size}`,
                star <= (readOnly ? rating : hover || rating)
                  ? 'fill-primary text-primary'
                  : 'fill-muted-foreground text-muted-foreground'
              )}
            />
          </button>
        ))}
      </div>
      {showValue && (
        <span className='ml-2 text-muted-foreground'>{rating}.0</span>
      )}
    </div>
  );
}
