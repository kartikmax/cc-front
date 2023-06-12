import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Updates from "./pages/Updates";
import VoiceNote from "./pages/VoiceNote";
import NotFound from "./pages/NotFound"; // Import your custom 404 page component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/about" element={<About />} />
        <Route path="/voice" element={<VoiceNote />} />
        <Route path="*" element={<NotFound />} /> {/* 404 route */}
      </Routes>
    </Router>
  );
};

export default App;
