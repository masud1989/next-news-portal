const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

export async function GET(req, res) {
    try {
        const Prisma = new PrismaClient()
        const {searchParams} = new URL(req.url)
        const type = searchParams.get('type')
        const result = await Prisma.news_list.findMany({
            where: {type: type},
            select: {id: true, title: true, short_desc:true, long_desc: true, img1: true, img2: true, img3:true, img4: true}
        })
        return NextResponse.json({status : 'success', Total: result.length, data: result})
    } 
    catch (error) {
        return NextResponse.json({status : 'fail', msg: error.toString()})
    }
}