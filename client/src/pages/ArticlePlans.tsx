import axios from "axios";
import React, { useEffect, useState } from "react";

const ArticlePlans = () => {
  const [prices, setPrices] = useState<any>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data: response } = await axios.get("http://localhost:5001/subs/prices");

    setPrices(response.data);
  };

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post("http://localhost:5001/subs/session", {
      priceId,
    });

    window.location.href = response.url; // open the stripe url to make the payment
  };

  return (
    <div style={{ display: "flex" }}>
      {prices.map((price: any) => (
        <div
          style={{
            border: "3px solid blue",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
            width: "200px",
          }}
          key={price.id}
        >
          <h2>{price.nickname}</h2>
          <h3>£{price.unit_amount / 100} per month</h3>
          <button onClick={() => createSession(price.id)}>Buy now</button>
        </div>
      ))}
    </div>
  );
};

export default ArticlePlans;
