import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { Session } from "inspector"
import { JWT } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters"


export const authOptions:AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        })
        if (user && user.password === credentials?.password) {
          // If using hashed passwords, use bcrypt.compare here
          return { id: user.id, email: user.email }
        }
        return null
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login"
  },
  callbacks: {
  async jwt({ token, user }) {
    // `user` exists only on first sign-in
    if (user) {
      token.id = user.id
      token.email = user.email
    }
    return token
  },
  async session({ session, token,user }) {
    // Make token info available in session
    if (token) {
      session.user = { id: token.id, email: token.email }
    }
    return session
  }
}

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }