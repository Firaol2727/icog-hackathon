import NextAuth, { AuthOptions, DefaultSession, DefaultUser } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { Session } from "inspector"
import { JWT } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters"


declare module "next-auth" {
  interface Session {
    user: {
      id: string; // add the id field
      role: string;
      
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // optional if you want user.id typed
    
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Your logic for user lookup
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });

        if (user && user.password === credentials?.password) {
          // This should be a secure comparison, e.g., bcrypt.compare
          return { id: user.id, email: user.email,role:user.role, name: user.name };
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name=user.name
        // The fix: Add the role to the token here
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
      session.user = {
        ...session.user,
        id: token.id as string,
        role: token.role as string,
        name: token.name as string
      };
    }
    return session;
    }
  }
};
