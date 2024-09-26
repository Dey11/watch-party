"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PlayIcon,
  PauseIcon,
  RefreshCwIcon,
  SendIcon,
  Maximize2Icon,
} from "lucide-react";

export function Id() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, user: "Alice", text: "Hey everyone!" },
    { id: 2, user: "Bob", text: "Hi Alice, ready for the movie?" },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, user: "You", text: message },
      ]);
      setMessage("");
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div>
      <div
        className={`flex ${
          isMaximized ? "flex-col lg:flex-row" : "flex-col"
        } gap-4`}
      >
        <div className={`${isMaximized ? "lg:w-3/4" : "w-full"}`}>
          <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden mb-4">
            {/* Replace this div with your video player component */}
            <div className="flex items-center justify-center text-gray-400">
              Video Player Placeholder
            </div>
          </div>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="py-4">
              <div className="flex space-x-2">
                <Button size="icon" variant="secondary">
                  <PlayIcon className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary">
                  <PauseIcon className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary">
                  <RefreshCwIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={toggleMaximize}
                >
                  <Maximize2Icon className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card
          className={`bg-gray-800 border-gray-700 ${
            isMaximized ? "lg:w-1/4" : "w-full"
          }`}
        >
          <CardContent className="p-4 h-[calc(100vh-16rem)] flex flex-col">
            <ScrollArea className="flex-grow mb-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-gray-700 p-2 rounded-lg">
                    <span className="font-semibold text-orange-400">
                      {msg.user}:{" "}
                    </span>
                    <span className="text-gray-200">{msg.text}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow bg-gray-700 border-gray-600 text-gray-100"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-rose-600 hover:bg-rose-700"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
