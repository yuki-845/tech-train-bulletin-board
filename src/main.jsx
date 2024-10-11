import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import ThreadNew from "./ThreadNew.jsx";
import ThreadDetail from "./ThreadDetail.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/threads/new" element={<ThreadNew />} />
      <Route path="/threads/:thread_id" element={<ThreadDetail />} />
    </Routes>
  </BrowserRouter>
);
