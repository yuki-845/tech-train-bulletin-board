import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ThreadDetail = () => {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState("");

  const fetchPosts = async (offset = 0) => {
    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts?offset=${offset}`);
      if (!response.ok) {
        throw new Error("サーバーエラー");
      }
      const data = await response.json();
      setPosts(data.posts); // ここでpostsをセット
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) {
      setError("投稿内容を入力してください。");
      return;
    }
    try {
      const response = await fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: newPost }), // postフィールド名を確認
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.ErrorMessageJP || "投稿に失敗しました");
      }

      const result = await response.json();
      // 新しい投稿をリストの先頭に追加
      setPosts((prevPosts) => [{ id: result.postId, content: result.post }, ...prevPosts]);
      setNewPost(""); // フォームをリセット
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPosts(); // 投稿を取得
  }, [thread_id]);

  return (
    <div>
      <h2>スレッドID: {thread_id} の投稿一覧</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title || "投稿"}</h3>
            <p>{post.content || post.post}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="投稿内容を入力..."
          required
        />
        <button type="submit">投稿</button>
      </form>
    </div>
  );
};

export default ThreadDetail;
