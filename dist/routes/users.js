"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({});
        res.json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        res.json({ success: false, error });
    }
}));
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //input validation
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const userRegistrationSchema = zod_1.default.object({
            username: zod_1.default.string().trim(),
            email: zod_1.default.string().email(),
            password: zod_1.default.string().min(3, "Password must contain at least 3 characters"),
        });
        const user = userRegistrationSchema.parse({
            username,
            email,
            password,
        });
        //input storing
        const createdUser = yield prisma.user.create({ data: user });
        //email validation
        const verificationToken = jsonwebtoken_1.default.sign(createdUser, process.env.SECRET);
        const verificationLink = `http://localhost:3000/verify-email?userId=${createdUser.id}&uniqueId=${createdUser.id}`;
        const message = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: "Verify Your Email Address",
            text: `Please click on the following link to verify your email address: ${verificationLink}`,
        };
        yield transporter.sendMail(message);
        res.json({
            createdUser,
        });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, error });
    }
}));
exports.default = router;
