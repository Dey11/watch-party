import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateRandomNumber() {
  const min = 10000;
  const max = 99999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getRooms(req: Request, res: Response) {
  try {
    const rooms = await prisma.room.findMany({});
    res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createRoom(req: Request, res: Response) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newRoom = await prisma.room.create({
      data: {
        code: generateRandomNumber(),
        name,
        owner: {
          connect: { id: req.user.id },
        },
        participants: {
          connect: { id: req.user.id },
        },
      },
    });

    res.status(200).json({ newRoom, message: "Room created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function joinRoom(req: Request, res: Response) {
  const code = parseInt(req.params.id);
  if (!code) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const room = await prisma.room.findFirst({ where: { code } });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await prisma.room.update({
      where: { id: room.id },
      data: {
        participants: {
          connect: { id: req.user.id },
        },
      },
    });

    res.status(200).json({ room, message: "Room joined successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// export async function leaveRoom(req: Request, res: Response) {
//   const { code } = req.body;
//   if (!code) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const room = await Room.findOne({ code });
//     if (!room) {
//       return res.status(404).json({ message: "Room not found" });
//     }

//     res.status(200).json(room);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
