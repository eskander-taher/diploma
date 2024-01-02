// src/server.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.get("/:name", async (req, res) => {
	//test prisma
	await prisma.user.create({
		data: {
			name: req.params.name,
		},
	});
	const users = await prisma.user.findMany();
	res.json(users);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
