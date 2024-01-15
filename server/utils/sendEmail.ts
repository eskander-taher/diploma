import nodemailer from 'nodemailer';

export interface Email {
  from: string;
  to: string;
  subject: string;
  content: string;
  cc?: string[];
  bcc?: string[];
  attachments?: string[];
}

export default async function sendEmail(email: Email): Promise<void> {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: `"Sender Name" <${email.from}>`, // sender address
    to: email.to, // list of receivers
    subject: email.subject, // subject line
    text: email.content, // plain text body
    cc: email.cc, // CC recipients
    bcc: email.bcc, // BCC recipients
    attachments: email.attachments?.map((path) => ({ path })), // Attachments
    // html: '<b>Hello world?</b>', // You can also include HTML content
  });

  console.log('Email sent successfully!');
}
