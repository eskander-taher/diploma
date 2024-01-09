// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import users from "./routes/users";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", users);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
