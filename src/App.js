import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Regiterpage";
import Homepage from "./pages/Homepage";
import BuatChecklist from "./pages/BuatChecklist";
// Impor PrivateRoute yang telah Anda buat

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />

        <Route path="/home" element={<Homepage />} />
        <Route path="/create-checklist" element={<BuatChecklist />} />
      </Routes>
    </Router>
  );
}

export default App;
