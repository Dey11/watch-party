"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Create() {
  const [roomName, setRoomName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isPublic, setIsPublic] = useState("public");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle room creation logic here
    console.log({ roomName, videoUrl, isPublic });
  };

  return (
    <div>
      <div className="max-w-md mx-auto">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-orange-400">Create a New Room</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roomName" className="text-gray-200">
                  Room Name
                </Label>
                <Input
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUrl" className="text-gray-200">
                  Video URL
                </Label>
                <Input
                  id="videoUrl"
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-200">Room Type</Label>
                <RadioGroup
                  value={isPublic}
                  onValueChange={setIsPublic}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public" className="text-gray-300">
                      Public
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private" className="text-gray-300">
                      Private
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700"
              >
                Create Room
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
