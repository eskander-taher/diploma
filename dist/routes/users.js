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
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'yourEmail@gmail.com',
        pass: 'yourPassword',
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
        //validate request inputs
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
        //store user in db
        const createdUser = yield prisma.user.create({ data: user });
        //verify email
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
