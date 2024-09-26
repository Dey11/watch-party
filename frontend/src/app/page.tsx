"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, Users, Video } from "lucide-react";

export default function Index() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-rose-500 to-purple-600 text-transparent bg-clip-text">
          Watch Together, Anytime, Anywhere
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-gray-300">
          Experience the joy of shared viewing with WatchParty. Synchronize your
          favorite videos and chat in real-time with friends and family.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white"
        >
          <Link href="/home">Get Started</Link>
        </Button>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <PlayCircle className="w-12 h-12 text-orange-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Synchronized Playback
            </h2>
            <p className="text-gray-400">
              Watch videos in perfect sync with your friends
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-12 h-12 text-rose-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Real-time Chat</h2>
            <p className="text-gray-400">
              Share reactions and comments as you watch
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Video className="w-12 h-12 text-purple-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Any Video, Any Time</h2>
            <p className="text-gray-400">
              Support for various video platforms and formats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
