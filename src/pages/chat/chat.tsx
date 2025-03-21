import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Conectado con ID:", socket.id);
    });

    socket.emit("message", "Hola desde React!");

    socket.on("message", (msg) => {
      console.log("📩 Mensaje recibido:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Error de conexión:", err);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat en tiempo real</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Chat;
