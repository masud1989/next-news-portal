import { NextResponse } from "next/server";
import { VerifyToken } from "./utility/JWT_Helper";


export async function middleware (req, res) {
    try {
       let token = req.cookies.get('token')
       let payload = await VerifyToken (token['value'])
       const requestHeader = new Headers(req.Headers)
       requestHeader.set('email', payload['email'])
       requestHeader.set('id', payload['id'])
       return NextResponse.next({request: {headers:requestHeader}})
    } 
    catch (error) {
        const requestHeader = new Headers(req.Headers)
        requestHeader.set('email', '0')
        requestHeader.set('id', '0')
        return NextResponse.next({request: {headers:requestHeader}})
     }
}

