import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authService } from './services';
import { loginSchema } from './schemas/loginSchema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
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
});
