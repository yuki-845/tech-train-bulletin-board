import React, { useState, useEffect } from "react";

const ThreadList = () => {
  const [threads, setThreads] = useState([]);

  const fetchThreads = (offset) => {
    fetch(
      `https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("サーバーエラー");
        }
        console.log("スレッド");
        return response.json();
      })
      .then((data) => {
        setThreads((prevThreads) => [...prevThreads, ...data]); // スレッド一覧にデータを追加
      })
      .catch((error) => console.error("エラーが発生しました:", error));
  };

  useEffect(() => {
    fetchThreads(0); // 初回のスレッド取得
  }, []);
  return (
    <div>
      <h2>新着スレッド</h2>
      <ul>
        {threads.map((thread, index) => (
          <li key={`${thread.id}-${index}`}>
            {" "}
            {/* idにindexを追加して一意性を確保 */}
            <h3>{thread.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
