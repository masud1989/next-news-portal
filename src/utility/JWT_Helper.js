import { SignJWT, jwtVerify } from "jose";

export async function CreateToken(email, id) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const payload = {email, id}
    const alg = 'HS256'
    let token = await new SignJWT(payload)
        .setProtectedHeader({alg})
        .setIssuedAt()
        .setIssuer(process.env.JWT_ISSUER)
        .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
        .sign(secret)
    
    return token
}

export async function VerifyToken(token) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    let decoded = await jwtVerify(token, secret)

    return decoded['payload']
} 