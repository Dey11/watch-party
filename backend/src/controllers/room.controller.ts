import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateRandomNumber() {
  const min = 10000;
  const max = 99999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getRooms(req: Request, res: Response) {
  try {
    // find rooms only with minimum 1 participants
    const rooms = await prisma.room.findMany({
      where: {
        participants: {
          some: {},
        },
      },
    });
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
    const room = await prisma.room.findFirst({
      where: { ownerId: req.user.id },
    });

    if (room) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const isParticipant = await prisma.room.findFirst({
      where: {
        participants: { some: { id: req.user.id } },
      },
    });

    if (isParticipant) {
      return res.status(400).json({ message: "You are already in a room" });
    }

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
    const isParticipant = await prisma.room.findFirst({
      where: {
        participants: { some: { id: req.user.id } },
      },
    });

    if (isParticipant) {
      return res.status(400).json({ message: "You are already in a room" });
    }

    const isOwner = await prisma.room.findFirst({
      where: {
        ownerId: req.user.id,
      },
    });

    if (isOwner) {
      return res.status(400).json({ message: "You are the owner of the room" });
    }

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

export async function leaveRoom(req: Request, res: Response) {
  try {
    const existingRoom = await prisma.room.findFirst({
      where: {
        participants: { some: { id: req.user.id } },
      },
    });

    if (!existingRoom) {
      return res.status(400).json({ message: "You are not in a room" });
    }

    await prisma.room.update({
      where: { id: existingRoom.id },
      data: { participants: { disconnect: { id: req.user.id } } },
    });

    // const existingOwnerr = await prisma.room.findFirst({
    //   where: {
    //     ownerId: req.user.id,
    //   },
    // });

    // if (!existingOwnerr) {
    //   return res
    //     .status(400)
    //     .json({ message: "You are not the owner of the room" });
    // }

    // await prisma.room.update({
    //   where: { id: existingOwnerr.id },
    //   data: { participants: { disconnect: { id: req.user.id } } },
    // });

    res.status(200).json({ message: "Room left successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
