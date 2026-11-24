
import user from "../assets/user.png";
import AIimage from "../assets/AIimage.png";
import Thumpup from "../assets/Thumpup.png";
import Thumpdn from "../assets/Thumpdn.png";

function ChatHistoryCard({ item }) {
  return (
    <div className="history-card">

      {/* User Message */}

      <div className="history-user">
        <img className="history-avatar" src={user} alt="" />

        <div className="history-message-content">
          <span className="history-name">You</span>

          <p>{item.question}</p>

          <span className="history-time">{item.time}</span>
        </div>
      </div>

      {/* AI Message */}

      <div className="history-ai">
        <img className="history-avatar" src={AIimage} alt="" />

        <div className="history-message-content">
          <span className="history-name">Soul AI</span>

          <p>{item.response}</p>

          <div className="history-footer">
            <span className="history-time">{item.time}</span>

            {item.ratingGiven && (
              <div className="history-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= item.rating
                        ? "history-star selected"
                        : "history-star"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            )}

            {!item.ratingGiven && !item.feedback && (
              <div className="history-feedback-icons">
                <img src={Thumpup} alt="Thumbs up" />
                <img src={Thumpdn} alt="Thumbs down" />
              </div>
            )}
          </div>

          {item.feedback && (
            <p className="history-feedback">
              <strong>Feedback:</strong> {item.feedback}
            </p>
          )}
        </div>
      </div>

    </div>
  );
}

export default ChatHistoryCard;
