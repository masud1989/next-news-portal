import nodemailer from "nodemailer";

export async function SendEmail(EmailTo, EmailText, EmailSubject) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: { user: process.env.MAIL_ID, pass: process.env.MAIL_PASS },
    // tls: { rejectUnauthorized: false },
  });

  const MailOption = {
    from: '"News Portal" <mranasrj01@gmail.com>', // sender address,
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(MailOption);
}
