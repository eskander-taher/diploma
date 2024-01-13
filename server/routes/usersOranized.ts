// userController.ts
import { Router, Request, Response } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const userRouter = Router();

const validateUserInput = (req: Request, res: Response, next: () => void) => {
  const { username, email, password } = req.body;

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

  req.body = { ...req.body, user };

  next();
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

const generateVerificationLink = (id: number, expirationTime: string) => {
  const verificationToken = jwt.sign({ id }, process.env.SECRET as string, {
    expiresIn: expirationTime,
  });
  return `http://localhost:3000/verify-email?token=${verificationToken}`;
};

const sendVerificationEmail = async (email: string, verificationLink: string) => {
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
};

userRouter.post("/users", validateUserInput, async (req: Request, res: Response) => {
  try {
    const { username, email, user } = req.body;

    const hashedPassword = await hashPassword(user.password);

    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const verificationLink = generateVerificationLink(createdUser.id, "1d");
    await sendVerificationEmail(email, verificationLink);

    res.json({
      success: true,
      message: "A message was sent to your email address.",
    });
  } catch (error: any) {
    console.error("User registration error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send verification email.",
    });
  }
});

// emailController.ts
const emailRouter = Router();

emailRouter.get("/verify-email", async (req: Request, res: Response) => {
  try {
    const verificationToken = req.query.token;
    const user = jwt.verify(verificationToken as string, process.env.SECRET as string) as User;

    const verifiedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });

    res.json({
      success: true,
      data: verifiedUser,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error,
    });
  }
});

// mainRouter.ts
const mainRouter = Router();
mainRouter.use("/users", userRouter);
mainRouter.use("/", emailRouter);

export default mainRouter;
