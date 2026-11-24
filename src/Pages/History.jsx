

import { useState, useEffect } from "react";

import ChatHistoryCard from "../components/ChatHistoryCard";
import ChatInput from "../components/ChatInput";
import chatData from "../data/chatData.json";

import "./History.css";

function History() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Retrieve saved conversations
  useEffect(() => {
    const savedMessages = JSON.parse(
      localStorage.getItem("chatHistory")
    ) || [];

    setMessages(savedMessages);
  }, []);

  // Send a new message
  function handleSendMessage() {
    const userQuestion = message.trim();

    if (!userQuestion) {
      return;
    }

    const matchedData = chatData.find(
      (item) =>
        item.question.trim().toLowerCase() ===
        userQuestion.toLowerCase()
    );

    const aiResponse = matchedData
      ? matchedData.response
      : "Sorry, Did not understand your query!";

    const currentDate = new Date();

    const newMessage = {
      id: Date.now(),
      question: userQuestion,
      response: aiResponse,

      time: currentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),

      date: currentDate.toLocaleDateString("en-CA"),

      ratingGiven: false,
      rating: 0,
      feedback: "",
    };

    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);

    localStorage.setItem(
      "chatHistory",
      JSON.stringify(updatedMessages)
    );

    setMessage("");
  }

  // Save conversation
  function handleSave() {
    localStorage.setItem(
      "chatHistory",
      JSON.stringify(messages)
    );

    console.log("Conversation saved");
  }

  return (
    <div className="history-page">

      <h2 className="history-title">
        Conversation History
      </h2>

      <h3 className="history-subtitle">
        Today's Chats
      </h3>

      <div className="history-list">

        {messages.length > 0 ? (
          messages.map((item) => (
            <ChatHistoryCard
              key={item.id}
              item={item}
            />
          ))
        ) : (
          <p className="no-history">
            No conversations available today.
          </p>
        )}

      </div>

      <ChatInput
        message={message}
        onMessageChange={setMessage}
        onSendMessage={handleSendMessage}
        onSave={handleSave}
      />

    </div>
  );
}

export default History;
