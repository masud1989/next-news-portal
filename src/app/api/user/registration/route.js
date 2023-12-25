import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST (req, res) {
    try {
        const Prisma = new PrismaClient()

        let PostBody = await req.json()
        PostBody.otp = "0"

        const Result = await Prisma.users.create({
            data: PostBody
        })

        return NextResponse.json({status: "success", data: PostBody})
        
    } catch (error) {
        return NextResponse.json({status: "fail", data: error.toString()})
    }
}