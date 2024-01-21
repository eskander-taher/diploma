import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const generateVerificationLink = (userId: number) => {
	const verificationToken = jwt.sign({ id: userId }, process.env.SECRET as string, {
		expiresIn: "1d",
	});
	return `http://localhost:3000/verify-email?token=${verificationToken}`;
};

export default async function sendVerificationEmail (id: number, email: string) {
	const message = {
		from: process.env.EMAIL_ADDRESS,
		to: email,
		subject: "Verify Your Email Address",
		text: `Please click on the following link to verify your email address: ${generateVerificationLink(
			id
		)}`,
	};
    await transporter.sendMail(message)
}
