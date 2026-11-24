import "./ChatInput.css";
function ChatInput({ message, onMessageChange, onSendMessage, onSave }) {
  function handleSubmit(event) {
    event.preventDefault();

    if (message.trim() === "") {
      return;
    }

    onSendMessage();
  }

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Message Bot AI…"
        value={message}
        onChange={(event) => onMessageChange(event.target.value)}
      />

      <button type="submit">
        Ask
      </button>
       <button type="button" onClick={onSave}>
       Save
      </button>
    </form>
  );
}

export default ChatInput;
