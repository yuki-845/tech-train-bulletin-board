import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams をインポート

const ThreadDetail = () => {
  const { thread_id } = useParams(); // URL から thread_id を取得
  const [posts, setPosts] = useState([]); // 投稿データ
  const [loading, setLoading] = useState(true); // ローディング状態
  const [error, setError] = useState(null); // エラー状態
  const [offset, setOffset] = useState(0); // オフセット管理

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${offset}`);
      if (!response.ok) {
        throw new Error("サーバーエラー");
      }
      const data = await response.json();
      console.log(data); // デバッグ用：取得したデータを表示

      setPosts((prevPosts) => [...prevPosts, ...data.posts]); // 取得した投稿を追加
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // 投稿を取得
  }, []); // thread_id または offset が変わったときに再取
  return (
    <div>
      <h2>スレッドID: {thread_id} の投稿一覧</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {Array.isArray(posts) && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.post}</p> {/* postプロパティを表示 */}
            </li>
          ))}
        </ul>
      ) : (
        <p>投稿がありません。</p> // 投稿がない場合のメッセージ
      )}
    </div>
  );
};

export default ThreadDetail;
