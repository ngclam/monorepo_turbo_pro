import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card, PageHeader } from "@remix/components";

const socket = io("http://localhost:4000", {
  autoConnect: false
});

export function App() {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState("Chưa có message");
  const [connectedAt, setConnectedAt] = useState("-");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setConnected(true);
      setConnectedAt(new Date().toLocaleString("vi-VN"));
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("server:message", (message: string) => {
      setLastMessage(message);
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Monitor" description="Theo dõi trạng thái realtime từ Socket.IO server." />
        <div className="grid gap-4 sm:grid-cols-3">
          <Card title="Socket Status">
            <p className={connected ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>
              {connected ? "Connected" : "Disconnected"}
            </p>
          </Card>
          <Card title="Last Message">
            <p className="text-sm text-slate-700">{lastMessage}</p>
          </Card>
          <Card title="Connection Time">
            <p className="text-sm text-slate-700">{connectedAt}</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
