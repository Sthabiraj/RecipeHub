import Credentials from 'next-auth/providers/credentials';
import { authService, userService } from './services';
import { loginSchema } from './schemas/loginSchema';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    Google,
    Facebook,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Safely cast credentials to CredentialsType
        const { email, password } = await loginSchema.parseAsync(credentials);

        // logic to verify if the user exists
        const { user } = await authService.login({
          email,
          password,
        });

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.');
        }

        // return user object with their profile data
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.profileImage,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          const result = await authService.loginWithOAuth({
            email: user.email as string,
            name: user.name as string,
            profileImage: user.image as string,
          });

          if (result.success && result.user) {
            user.id = result.user._id;
            return true;
          } else {
            console.error('Failed to register/retrieve user:', result.message);
            return false;
          }
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.picture as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
