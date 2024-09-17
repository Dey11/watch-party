import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const salt = bcrypt.genSaltSync(10);

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    z.object({
      name: z.string().min(1),
      email: z.string().email().min(1),
      password: z.string().min(1),
    }).parse({ name, email, password });

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    z.object({
      email: z.string().email().min(1),
      password: z.string().min(1),
    }).parse({ email, password });

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET as Secret, {
      expiresIn: "30d",
    });

    res
      .status(200)
      .json({ token, id: user.id, message: "User logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req: Request, res: Response) {}
