import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Page01 from "./logins/Page01";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/Home">HomePage</Link>
            </li>
            <li>
              <Link to="/01">Page 01</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/01" element={<Page01 />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
