
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Home from "./Pages/Home";
import History from "./Pages/History";
import Theme from "./Pages/Theme";
import Layout from "./components/Layout";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/theme" element={<Theme />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
