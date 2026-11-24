

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sideimg from ".././assets/sideimg.png";
import image31 from ".././assets/image31.png";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNewChat() {
    localStorage.removeItem("currentChat");
    navigate("/");
    setMenuOpen(false);
  }

  function handleHistory() {
    navigate("/history");
    setMenuOpen(false);
  }

  return (
    <>
      {/* Mobile hamburger button */}

      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Background overlay */}

      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}

      <div className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>

        <div className="sidebar-item">

          <div className="new-chat">

            <img src={sideimg} alt="Bot logo" />

            <button onClick={handleNewChat}>
              New Chat
            </button>

            <img src={image31} alt="New chat icon" />

          </div>

          <button
            className="past-chat"
            onClick={handleHistory}
          >
            Past Conversations
          </button>

        </div>

      </div>
    </>
  );
}

export default Sidebar;
