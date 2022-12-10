import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]); // The type of state is an array of type Article

  const fetchArticles = async () => {
    const { data: response } = await axios.get("http://localhost:5001/articles");
    setArticles(response);
  };

  useEffect(() => {
    fetchArticles();
  });

  return (
    <div>
      {articles.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {articles.map((article) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 400,
                border: "2px solid black",
                marginBottom: 20,
              }}
            >
              {article.imageUrl && (
                <img src={article.imageUrl} alt="Article" style={{ height: 200, width: 200 }} />
              )}
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>No articles</h2>
          <Link to="/">Buy a subscription plan</Link>
        </div>
      )}
    </div>
  );
};

export default Articles;
