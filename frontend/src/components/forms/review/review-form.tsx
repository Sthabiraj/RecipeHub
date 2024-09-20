'use client';

import { RatingComponent } from '@/components/rating-component';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ReviewFormData, reviewSchema } from '@/schemas/reviewSchema';
import { reviewService } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ReviewForm() {
  const { id: recipeId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      review: '',
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      setIsLoading(true);
      // const response = await reviewService.createReview({
      //   recipeId: recipeId[0],
      //   ...data,
      // });
      console.log({ recipeId, ...data });
      // form.reset();
      toast.success('Review posted successfully');
      // console.log(response.success && response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>
                Your Rating{' '}
                <span className='text-sm font-normal text-muted-foreground/70'>
                  (required)
                </span>
              </FormLabel>
              <FormControl>
                <RatingComponent onChange={field.onChange} size={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='review'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>
                Your Review{' '}
                <span className='text-sm font-normal text-muted-foreground/70'>
                  (optional)
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={3}
                  className='bg-background'
                  placeholder='Share your love! Tell us what you thought about the recipe in a quick review.'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button className='rounded-full' type='submit' disabled={isLoading}>
            Post Review
          </Button>
        </div>
      </form>
    </Form>
  );
}
