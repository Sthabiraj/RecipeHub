'use server';

import { signIn, signOut } from './auth';
import { LoginFormData } from './schemas/loginSchema';

export const loginAction = async (userData: LoginFormData) => {
  await signIn('credentials', userData);
};

export const logoutAction = async () => {
  await signOut();
};

export const googleOAuthAction = async () => {
  await signIn('google', { redirectTo: '/' });
};

export const facebookOAuthAction = async () => {
  await signIn('github', { redirectTo: '/' });
};
