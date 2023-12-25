import { CreateToken } from "@/utility/JWT_Helper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST (req, res) {
    try {
        const Prisma = new PrismaClient()
        let PostBody = await req.json()
        
        const Result = await Prisma.users.findUnique({where:PostBody})

        if (Result.length === 0) {
            return NextResponse.json({status: "fail", msg: 'No User found with this Email Account'})
        } else {
            let token = await CreateToken(Result['email'], Result['id'])
            let duration = new Date(Date.now() + 24*60*60*1000)
            const cookieString = `token=${token}; expires=${duration.toUTCString()}; path=/`
            return NextResponse.json({status: "success", token: token}, {status:200, headers:{'set-cookie': cookieString}})
        }
         
    } catch (error) {
        return NextResponse.json({status: "fail", data: error.toString()})
    }
}