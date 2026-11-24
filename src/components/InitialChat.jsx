import "./InitialChat.css";
import image from ".././assets/image.png";
function InitialChat({ onSelectQuestion }) {

  const suggestions = [
    {
      heading: "Hi, what is the weather",
      description: "Get immediate AI generated response"
    },
    {
      heading: "Hi, what is my location",
      description: "Get immediate AI generated response"
    },
    {
      heading: "Hi, what is the temperature",
      description: "Get immediate AI generated response"
    },
    {
      heading: "Hi, how are you",
      description: "Get immediate AI generated response"
    }
  ];

  return (
    <div className="initial-chat">

      <h1>How Can I Help You Today?</h1>

      <img src={image} alt="" />

      <div className="suggestions">

        {suggestions.map((item, index) => (
          <button
            key={index}
            type="button"
            className="suggestion-card"
            onClick={() => onSelectQuestion(item.heading)}
          >
            <h4>{item.heading}</h4>
            <p>{item.description}</p>
          </button>
        ))}

      </div>

    </div>
  );
}
export default InitialChat;
