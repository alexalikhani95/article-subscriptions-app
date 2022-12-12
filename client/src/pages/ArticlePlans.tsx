import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./article-plans.css";

const ArticlePlans = () => {
  const fetchPrices = async () => {
    const { data: response } = await axios.get("http://localhost:5001/subs/prices");
    return response.data;
  };

  const { isLoading, isError, data } = useQuery({ queryKey: ["prices"], queryFn: fetchPrices });

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post("http://localhost:5001/subs/session", {
      priceId,
    });

    window.location.href = response.url; // open the stripe url to make the payment
  };

  if (isError) {
    return <p>Oops, there was an error loading the prices.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      {data &&
        data.length &&
        data.map((price: any) => (
          <div className="article-plan-card" key={price.id}>
            <h2>{price.nickname}</h2>
            <h3>£{price.unit_amount / 100} per month</h3>
            <button onClick={() => createSession(price.id)}>Buy now</button>
          </div>
        ))}
    </div>
  );
};

export default ArticlePlans;
