import React from "react";
import Login from "./Login";
import Signup from "./Signup";

const Homepage = () => {
  return (
    <div style={{ marginTop: 20, display: "flex" }}>
      <div style={{ margin: 20 }}>
        <Signup />
      </div>
      <div style={{ margin: 20 }}>
        <Login />
      </div>
    </div>
  );
};

export default Homepage;
