

import { useState, useEffect } from "react";

import InitialChat from "../components/InitialChat";
import ChatInput from "../components/ChatInput";
import chatData from "../data/chatData.json";

import user from ".././assets/user.png";
import AIimage from ".././assets/AIimage.png";
import Thumpup from ".././assets/Thumpup.png";
import Thumpdn from ".././assets/Thumpdn.png";
import light from ".././assets/light.png";

import "./Home .css";

function Home() {
  const [message, setMessage] = useState("");

  // Get previously saved conversations
  const [messages, setMessages] = useState(() => {
  const savedMessages = localStorage.getItem("currentChat");

  return savedMessages ? JSON.parse(savedMessages) : [];
});

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackTargetId, setFeedbackTargetId] = useState(null);
  const [feedbackMessageId, setFeedbackMessageId] = useState(null);
  // Automatically save messages whenever they change
  useEffect(() => {
  localStorage.setItem(
    "currentChat",
    JSON.stringify(messages)
  );
}, [messages]);

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

// Save the current conversation
localStorage.setItem(
  "currentChat",
  JSON.stringify(updatedMessages)
);

// Also add the new message to conversation history
const savedHistory = JSON.parse(
  localStorage.getItem("chatHistory")
) || [];

const updatedHistory = [...savedHistory, newMessage];

localStorage.setItem(
  "chatHistory",
  JSON.stringify(updatedHistory)
);

// Clear input
setMessage("");
}

function updateMessage(id, updatedData) {
  setMessages((prevMessages) => {
    const updatedMessages = prevMessages.map((item) =>
      item.id === id
        ? { ...item, ...updatedData }
        : item
    );

    localStorage.setItem(
      "currentChat",
      JSON.stringify(updatedMessages)
    );

    return updatedMessages;
  });

  const savedHistory = JSON.parse(
    localStorage.getItem("chatHistory")
  ) || [];

  const updatedHistory = savedHistory.map((item) =>
    item.id === id
      ? { ...item, ...updatedData }
      : item
  );

  localStorage.setItem(
    "chatHistory",
    JSON.stringify(updatedHistory)
  );
}
  

  function handleSave() {
  localStorage.setItem(
    "chatHistory",
    JSON.stringify(messages)
  );

  console.log("Conversation saved");
}

  // Thumbs up
  function handleThumbsUp(id) {
  updateMessage(id, {
    ratingGiven: true,
  });
}
 function handleStarClick(id, rating) {
  updateMessage(id, {
    rating: rating,
    ratingGiven: true,
  });
}

  // Select star rating
  
  // Thumbs down
  function handleThumbsDown(id) {
  setFeedbackMessageId(id);
  setShowFeedbackModal(true);
}

  // Submit written feedback
  function handleFeedbackSubmit() {
  updateMessage(feedbackMessageId, {
    feedback: feedback,
  });

  setFeedback("");
  setFeedbackMessageId(null);
  setShowFeedbackModal(false);
}

  return (
    <div className="home">

      {messages.length === 0 && (
        <InitialChat onSelectQuestion={setMessage} />
      )}

      {messages.length > 0 && (
        <div className="chat-messages">

          {messages.map((item) => (
            <div className="chat-message" key={item.id}>

              {/* User Message */}

              <div className="user-message">
                <img
                  className="avatar"
                  src={user}
                  alt=""
                />

                <span>You</span>

                <p>{item.question}</p>

                <span className="message-time">
                  {item.time}
                </span>
              </div>

              {/* AI Message */}

              <div className="ai-message">
                <img
                  className="avatar"
                  src={AIimage}
                  alt=""
                />

                <span>Soul AI</span>

                <p>{item.response}</p>

                <div className="message-footer">

                  <span className="message-time">
                    {item.time}
                  </span>

                  {!item.ratingGiven && (
                    <div className="feedback-icons">

                      <img
                        src={Thumpup}
                        alt="Thumbs up"
                        onClick={() => handleThumbsUp(item.id)}
                      />

                      <img
  src={Thumpdn}
  alt="Thumbs down"
  onClick={() => handleThumbsDown(item.id)}
/>

                    </div>
                  )}

                 {item.ratingGiven && (
  <div className="rating-stars">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        type="button"
        key={star}
        className={
          star <= item.rating
            ? "star selected"
            : "star"
        }
        onClick={() => handleStarClick(item.id, star)}
      >
        ★
      </button>
    ))}
  </div>
)}
                </div>
              </div>

            </div>
          ))}

        </div>
      )}

      <ChatInput
        message={message}
        onMessageChange={setMessage}
        onSendMessage={handleSendMessage}
        onSave={handleSave}
      />

      {/* Feedback Modal */}

      {showFeedbackModal && (
        <div className="feedback-overlay">

          <div className="feedback-modal">

            <div className="feedback-header">

              <span className="feedback-light">
                <img src={light} alt="" />
              </span>

              <span>Provide Additional Feedback</span>

              <button
                className="close-btn"
                onClick={() => setShowFeedbackModal(false)}
              >
                X
              </button>

            </div>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="feedback-submit">
              <button onClick={handleFeedbackSubmit}>
                Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
