import { Router, Request, Response } from "express";
const router = Router();

import z from "zod";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";



router.get("/users", async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany({});
		
		res.json({
			success: true,
			data: users,
		});
	} catch (error: any) {
		res.json({ success: false, error });
	}
});

router.delete("/users", async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.deleteMany({});

		res.json({
			success: true,
			data: users,
		});
	} catch (error: any) {
		res.json({ success: false, error });
	}
});

router.post("/users", async (req: Request, res: Response) => {
	try {
		//input validation
		const username: string = req.body.username;
		const email: string = req.body.email;
		const password: string = req.body.password;

		const userRegistrationSchema = z.object({
			username: z.string().trim(),
			email: z.string().email(),
			password: z.string().min(3, "Password must contain at least 3 characters"),
		});

		const user = userRegistrationSchema.parse({
			username,
			email,
			password,
		});

		//input storing
		const salt = await bcrypt.genSalt(SALT_ROUNDS);
		const hashedPassword = await bcrypt.hash(password, salt);
		const createdUser = await prisma.user.create({
			data: {
				...user,
				password: hashedPassword,
			},
		});

		//email validation
		const verificationToken = jwt.sign(createdUser, process.env.SECRET as string);
		const verificationLink: string = `http://localhost:3000/verify-email?token=${verificationToken}`;

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const message = {
			from: process.env.EMAIL_ADDRESS,
			to: email,
			subject: "Verify Your Email Address",
			text: `Please click on the following link to verify your email address: ${verificationLink}`,
		};

		await transporter.sendMail(message);

		res.json({
			message: "a message to user email has been sent",
		});
	} catch (error: any) {
		console.log(error);
		res.json({ success: false, error });
	}
});

export default router;
