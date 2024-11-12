import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import User from "@/models/user"
import { connectDatabase } from "@/lib/connectDB"
export async function POST(req) {
    try {
        const { name, email, password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectDatabase()
        await User.create({name, email, password: hashedPassword })
        return NextResponse.json({message: "User registered "}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "an error occurred while registering the user. "}, { status: 500 })
    }   
}