import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { Session } from "inspector"
import { JWT } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters"
import { authOptions } from "../../authOptions"


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
