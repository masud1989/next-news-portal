import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST (req, res){
    try {
        const prisma = new PrismaClient()
        const PostBody = await req.json()

        const count = await prisma.users.count({where: {email:PostBody['email'], otp: PostBody['otp']}})
        
        if (count === 1) {
            const Result = await prisma.users.update({
                where: {email: PostBody['email']},
                data: {otp: "0", password: PostBody['password']}
            })
            return NextResponse.json({status: 'success', data: "Password Reset Success"})
        } 
        else {
            return NextResponse.json({status: 'fail', data: "Password Reset Fail"})  
        }
    } 
    catch (error) {
        return NextResponse.json({status: 'fail', data: error}) 
    }
}