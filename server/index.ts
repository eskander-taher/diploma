// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

import users from "./routes/users";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", users);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
