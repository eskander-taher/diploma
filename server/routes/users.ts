import { Router, Request, Response } from "express";
const router = Router();

import z from "zod";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


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

router.post("/users", async (req: Request, res: Response) => {
	try {
		//validate request inputs
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

		//store user in db
		const createdUser = await prisma.user.create({ data: user });

		//verify email

		res.json({
			createdUser,
		});
	} catch (error: any) {
		console.log(error);
		res.json({ success: false, error });
	}
});

export default router;
