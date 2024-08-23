import { ReviewResponse, Review } from '@/types';
import { api } from '@/lib/api';

export const reviewService = {
  createReview: async (reviewData: Review) => {
    const response = await api.post<ReviewResponse>('/review', reviewData);
    return response.data;
  },
  getReviews: async (recipeId: string) => {
    const response = await api.get<ReviewResponse>(`/review/${recipeId}`);
    return response.data;
  },
  updateReview: async (id: string, reviewData: Partial<Review>) => {
    const response = await api.put<ReviewResponse>(`/review/${id}`, reviewData);
    return response.data;
  },
  deleteReview: async (id: string) => {
    const response = await api.delete<ReviewResponse>(`/review/${id}`);
    return response.data;
  },
};
