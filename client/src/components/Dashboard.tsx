import React from "react";
import Articles from "../pages/Articles";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Dashboard</h1>
      <Articles />
    </div>
  );
};

export default Dashboard;
