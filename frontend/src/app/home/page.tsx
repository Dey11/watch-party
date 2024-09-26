"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";

export default function Home() {
  const rooms = [
    { id: 1, name: "Movie Night", participants: 5 },
    { id: 2, name: "Anime Marathon", participants: 3 },
    { id: 3, name: "Music Videos", participants: 2 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-orange-400">Public Rooms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-orange-400">{room.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-gray-400">
                <Users className="mr-2 h-4 w-4" />
                <span>{room.participants} participants</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-rose-600 hover:bg-rose-700">
                <Link href={`/room/${room.id}`}>Join Room</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
          <Link href="/create">Create New Room</Link>
        </Button>
      </div>
    </div>
  );
}
