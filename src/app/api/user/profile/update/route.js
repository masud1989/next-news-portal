import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST (req, res) {
    try {
        let headerList = headers()
        let id = parseInt(headerList.get('id'))
        const Prisma = new PrismaClient()

        let PostBody = await req.json()

        const result = await Prisma.users.update({
            where: {id: id},
            data: PostBody
        })

        return NextResponse.json({status: "success", data: result})
        
    } catch (error) {
        return NextResponse.json({status: "fail", data: error.toString()})
    }
}