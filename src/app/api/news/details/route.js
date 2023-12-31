const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

export async function GET(req, res) {
    try {
        const Prisma = new PrismaClient()
        const {searchParams} = new URL(req.url)
        const id = parseInt(searchParams.get('id'))
        const result = await Prisma.news_list.findUnique({
            where : {id: id},
            include : {categories : true}
        })
        return NextResponse.json({status : 'success', Total: result.length, data: result})
    } 
    catch (error) {
        return NextResponse.json({status : 'fail', msg: error.toString()})
    }
}