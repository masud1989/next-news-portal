import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST (req, res){
    try {
        const prisma = new PrismaClient()
        const PostBody = await req.json()

        const count = await prisma.users.count({where: PostBody})
        
        if (count === 1) {
            return NextResponse.json({status: 'success', data: "Your OTP is Valid"})
        } 
        else {
            return NextResponse.json({status: 'fail', data: "Your OTP is Invalid"})  
        }
    } 
    catch (error) {
        return NextResponse.json({status: 'fail', data: error}) 
    }
}