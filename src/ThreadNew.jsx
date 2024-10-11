// src/ThreadNew.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
const ThreadNew = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://railway.bulletinboard.techtrain.dev/threads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
          }),
        }
      );
      if (response.ok) {
        navigate("/");
      } else {
        console.error("スレッドの作成に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };
  return (
    <div>
      <Header />
      <h2>新規スレッド作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>スレッドタイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type="submit">作成</button>
      </form>
    </div>
  );
};

export default ThreadNew;
