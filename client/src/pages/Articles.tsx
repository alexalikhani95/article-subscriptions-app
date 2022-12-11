import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./articles.css";

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
        <div className="articles-container">
          {articles.map((article) => (
            <div className="article-card">
              {article.imageUrl && (
                <img src={article.imageUrl} alt="Article" style={{ height: 200, width: 200 }} />
              )}
              <h3>{article.title}</h3>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="articles-container">
          <h2>No articles</h2>
          <Link to="/article-plans">Click here to buy a subscription plan</Link>
        </div>
      )}
    </div>
  );
};

export default Articles;
