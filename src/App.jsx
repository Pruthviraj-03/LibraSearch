import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Books } from "./pages/index";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/books" element={<Books />} />
      </Routes>
    </div>
  );
};

export default App;
