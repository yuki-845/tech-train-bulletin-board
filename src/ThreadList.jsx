import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchThreads = async (offset) => {
    setLoading(true); // フェッチ開始時にローディングを設定
    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`);
      if (!response.ok) {
        throw new Error("サーバーエラー");
      }
      const data = await response.json();
      setThreads((prevThreads) => [...prevThreads, ...data]); // スレッド一覧にデータを追加
      setError(null); // エラー状態をリセット
    } catch (error) {
      setError(error.message); // エラーメッセージを設定
    } finally {
      setLoading(false); // フェッチ完了時にローディングを解除
    }
  };

  useEffect(() => {
    fetchThreads(0); // 現在のオフセットからスレッドを取得
  }, []);

  return (
    <div>
      <h2>新着スレッド</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <Link to={`/threads/${thread.id}`} >{thread.title}</Link> {/* スレッドタイトルをリンクとして表示 */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
