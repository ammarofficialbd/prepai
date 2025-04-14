import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



const options = {
    providers: [
       CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: {  label: "Password", type: "password" }
        },
        async authorize(credentials) {
            await dbConnect()

            const user = await User.findOne({ email: credentials?.email })

            if(!user) throw new Error("Invalid USer and Password")
            
            const isPasswordMatch = await user.comparePassword(credentials?.password)
            if(!isPasswordMatch) throw new Error("Invalid USer and Password")
            return user;
        }
       })
    ],
    session: {
        strategy : "jwt" as const,
    },
    pages:{
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export const GET = NextAuth(options)
export const POST = NextAuth(options)