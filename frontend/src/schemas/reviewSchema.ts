import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be between 1 and 5').max(5),
  review: z.string().trim().optional(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
