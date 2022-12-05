import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div style={{ borderBottom: "1px solid blue", display: "flex" }}>
      <div style={{ margin: "20px" }}>
        <Link to="/">Home</Link>
      </div>
      {localStorage.getItem("token") && (
        <div style={{ margin: "20px" }}>
          <Link to="/">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
