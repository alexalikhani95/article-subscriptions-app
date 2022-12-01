import React from "react";
import Login from "./Login";

const Homepage = () => {
  return (
    <div style={{ marginTop: 20, display: "flex" }}>
      <div style={{ margin: 20 }}>
        <Login text="Sign Up" />
      </div>
      <div style={{ margin: 20 }}>
        <Login text="Login" />
      </div>
    </div>
  );
};

export default Homepage;
