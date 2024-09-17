"use client";

import { socket } from "@/socket";
import { useEffect, useState } from "react";

export default function Home() {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    if (!socket) return;

    socket.connect();

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>{connected ? "connected" : "disconnected"}</p>

      <button onClick={() => socket.disconnect()}>disconnect</button>
      <button onClick={() => socket.connect()}>connect</button>
    </div>
  );
}
