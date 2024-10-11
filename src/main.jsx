import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import ThreadNew from "./ThreadNew.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/threads/new" element={<ThreadNew />} />
    </Routes>
  </BrowserRouter>
);
