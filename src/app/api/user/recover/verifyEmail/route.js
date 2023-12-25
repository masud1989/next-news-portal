import { SendEmail } from "@/utility/EmailHelper";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    let email = searchParams.get("email");
    const count = await prisma.users.count({ where: { email: email } });
    if (count === 1) {
      let code = Math.floor(100000 + Math.random() * 999999);
      let EmailText = `Your OTP Code is = ${code}`;
      let EmailSubject = "OTP Code";
      await SendEmail(email, EmailText, EmailSubject);
      const result = await prisma.users.update({
        where: { email: email },
        data: { otp: code.toString() },
      });
      return NextResponse.json({ status: "success", data: result });
    } else {
      return NextResponse.json({
        status: "fail",
        msg: "No user found with this email account",
      });
    }
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error.toString() });
  }
}
