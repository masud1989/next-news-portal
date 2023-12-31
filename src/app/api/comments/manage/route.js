import { headers } from "next/headers";
const { PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

export async function GET(req, res){
    try {
        const headerList = headers() 
        const id = parseInt(headerList.get('id'))
        const Prisma = new PrismaClient()
       const  result = await Prisma.comments.findMany({
            where: {userId: id},
            include: {news_list: {select:{title:true}}}
       })
       return NextResponse.json({status : 'success', Total: result.length, data: result})
    } 
    catch (error) {
        return NextResponse.json({status : 'fail', msg: error.toString()})
    }
}

export async function POST(req, res){
    try {
        const headerList = headers()
        const id = parseInt(headerList.get('id'))
        const postBody = await req.json()
        postBody.userId= id
        const Prisma = new PrismaClient()
        const result = await Prisma.comments.create({
            data: postBody
        })
        return NextResponse.json({status : 'success',data: result})
    } 
    catch (error) {
        return NextResponse.json({status : 'fail', msg: error.toString()})
    }
}

export async function DELETE(req, res){
    try {
        const headerList = headers()
        const user_id = parseInt(headerList.get('id'))
        const postBody = await req.json()
        const comment_id = parseInt(postBody['id'])
        const Prisma = new PrismaClient()
        const result = await Prisma.comments.deleteMany({
            where:{
                AND:[
                    {userId : user_id},
                    {id : comment_id},
                ]
            }
        })
        return NextResponse.json({status : 'success', data: result})
    } 
    catch (error) {
        return NextResponse.json({status : 'fail', msg: error.toString()})
    }
}




