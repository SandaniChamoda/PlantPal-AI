interface ChatMessageProps {
  message: string;
  sender: "user" | "ai";
}

export default function ChatMessage({
  message,
  sender,
}: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        sender === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-md rounded-xl px-4 py-3 ${
          sender === "user"
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {message}
      </div>
    </div>
  );
}