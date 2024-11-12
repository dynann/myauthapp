import NextAuth from "next-auth";
import bcrypt from "bcryptjs"
import { connectDatabase } from "@/lib/connectDB";
import dotenv from 'dotenv'
dotenv.config()
import User from "@/models/user";
import Credentials from "next-auth/providers/credentials";

export const authOptions =  {
  providers : [
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials){
       const { email, password } = credentials
       try {
        await connectDatabase()
        const user = await User.findOne({email})
        if(!user){
          console.log("user not found")
          return null
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
          console.log(email)
          console.log(password, user.password)
          return null
        }
        return user
       } catch(error){
        console.log(error)
       }
       
      }
    })
  ], 
  sessions : {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}