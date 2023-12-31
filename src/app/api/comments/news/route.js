import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";



export async function GET(req, res){
    try {
       const {searchParams} = new URL(req.url) 
       const postId = parseInt(searchParams.get('postId'))
       const Prisma = new PrismaClient()

       const  result = await Prisma.comments.findMany({
            where: {postId: postId},
            include: {users: {select:{id:true, firstName:true, lastName:true}}}
       })
       return NextResponse.json({status : 'success', Total: result.length, data: result})


    } 
    catch (error) {
        return NextResponse.json({status : 'fail', msg: error.toString()})
    }
}