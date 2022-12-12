import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./articles.css";
import { useQuery } from "@tanstack/react-query";

interface Article {
  id: string;
  title: string;
  imageUrl?: string;
  content: string;
}

const Articles = () => {
  // const [articles, setArticles] = useState<Article[]>([]); // The type of state is an array of type Article

  const fetchArticles = async (): Promise<Article[]> => {
    const { data: response } = await axios.get("http://localhost:5001/articles");
    return response;
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  useEffect(() => {
    fetchArticles();
  });

  if (isError) {
    return (
      <div>
        <p>Oops, There was an error fetching the articles.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {data ? (
        <div className="articles-container">
          {data.map((article: any) => (
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
