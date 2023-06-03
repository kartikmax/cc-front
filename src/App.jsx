import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Updates from "./pages/Updates";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
