const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

export async function GET(req, res){
    try {
        const Prisma = new PrismaClient()
        const {searchParams} = new URL(req.url)
        const type = searchParams.get('type')

        const  result = await Prisma.policies.findMany({where: {type: type}})

        return NextResponse.json({status : 'success', data: result})

    } 
    catch (error) {
        return NextResponse.json({status : 'fail', msg: error.toString()})
    }
}

export async function PUT(req, res){
    try {
        const Prisma = new PrismaClient()
        const  result = await Prisma.policies.findMany()

        return NextResponse.json({status : 'success', Total: result.length, data: result})

    } 
    catch (error) {
        return NextResponse.json({status : 'fail', msg: error.toString()})
    }
}