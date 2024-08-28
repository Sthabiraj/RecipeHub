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
    // async signIn({ user, account }) {
    //   if (account?.provider === 'google' || account?.provider === 'facebook') {
    //     try {
    //       const existingUser = await userService.getUserByEmail(
    //         user.email as string
    //       );

    //       if (!existingUser) {
    //         const newUser = await authService.register({
    //           email: user.email as string,
    //           name: user.name as string,
    //           image: user.image as string,
    //         });

    //         if (newUser && newUser.user && newUser.user._id) {
    //           user.id = newUser.user._id;
    //         } else {
    //           console.error('Failed to create new user');
    //           return false;
    //         }
    //       } else {
    //         await userService.updateUser(existingUser.user?._id as string, {
    //           name: user.name as string,
    //           profileImage: user.image as string,
    //         });
    //         user.id = existingUser.user?._id;
    //       }

    //       return true;
    //     } catch (error) {
    //       console.error('Error in signIn callback:', error);
    //       return false;
    //     }
    //   }
    //   return true;
    // },
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
