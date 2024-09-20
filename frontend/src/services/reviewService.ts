import { ReviewResponse, Review } from '@/types';
import { api } from '@/lib/api';
import { ReviewFormData } from '@/schemas/reviewSchema';

export const reviewService = {
  createReview: async (reviewData: Review) => {
    const response = await api.post<ReviewResponse>('/reviews', reviewData);
    return response.data;
  },
  getReviews: async (recipeId: string) => {
    const response = await api.get<ReviewResponse>(
      `/recipe/${recipeId}/reviews`
    );
    return response.data;
  },
  updateReview: async (id: string, reviewData: Partial<Review>) => {
    const response = await api.put<ReviewResponse>(
      `/reviews/${id}`,
      reviewData
    );
    return response.data;
  },
  deleteReview: async (id: string) => {
    const response = await api.delete<ReviewResponse>(`/reviews/${id}`);
    return response.data;
  },
};
