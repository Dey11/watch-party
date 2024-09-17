import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);

export async function signIn(req: Request, res: Response) {}

export async function login(req: Request, res: Response) {}

export async function logout(req: Request, res: Response) {}
