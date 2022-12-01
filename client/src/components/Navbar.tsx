import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div style={{ borderBottom: "1px solid blue", display: "flex" }}>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NavBar;
