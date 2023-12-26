const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

export async function GET(req, res){
    try {
        const Prisma = new PrismaClient()
        const  result = await Prisma.socials.findMany()
        return NextResponse.json({status : 'success', data: result})
    } 
    catch (error) {
        return NextResponse.json({status : 'fail', msg: error.toString()})
    }
}