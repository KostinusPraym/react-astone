import { Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>

  );
}

export default App;
