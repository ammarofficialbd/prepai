import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user.model";
import { a } from "framer-motion/client";
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

            const user = await User.findOne({ email: credentials?.email }).select("+password")

            if(!user) throw new Error("Invalid USer and Password")
            
            const isPasswordMatch = await user.comparePassword(credentials?.password)
            if(!isPasswordMatch) throw new Error("Invalid User and Password")
            return user;
        }
       })
    ],
    session: {
        strategy : "jwt" as const,
    },
    callbacks:{
        async signIn({user, account, profile}: any){
            if(account?.provider === "credentials"){
                user.id = user?._id
            } else {
                //handle social login
                const existingUser = await User.findOne({email: profile?.email})
                if(existingUser){
                    user.id = existingUser._id
                } else {
                    const newUser = await User.create({
                        name: profile?.name,
                        email: profile?.email,
                        profilePicture: {
                            url: profile?.image || user?.image
                        },
                        authProviders:{
                            provider: account?.provider,
                            providerId: account?.id || profile?.id
                        }
                    })
                    await newUser.save()
                    user.id = newUser._id
                }
            }
        return true
        },
        async jwt({token, user}: any){
            /* console.log("jwt", token, user) */

            if(user){
                token.user = user
            }
            return token
        },
        async session({session, token}: any){
       /*  console.log("session", session, token) */
            if(token){
                session.user= token.user

            }
            delete session.user.password
            return session
        }
    },
    pages:{
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export const GET = NextAuth(options)
export const POST = NextAuth(options)