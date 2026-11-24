import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import thdots from ".././assets/thdots.png";
import "./Layout.css";

function Layout() {
  return (
    <div className="app-container">

      <header className="top-header">
        <img src={thdots} alt="" />
      </header>

      <div className="app-body">

        <Sidebar />

        <div className="main-section">
          <Navbar />

          <main className="main-content">
            <Outlet />
          </main>

        </div>

      </div>

    </div>
  );
}

export default Layout;