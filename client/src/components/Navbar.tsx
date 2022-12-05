import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context";

const NavBar = () => {
  const [state, setState] = useContext(UserContext);

  console.log(state);
  return (
    <div style={{ borderBottom: "1px solid blue", display: "flex" }}>
      <div style={{ margin: "20px" }}>
        <Link to="/">Home</Link>
      </div>
      {state.data && ( // If there is something in localstorage (token in this case) show the logout
        <div style={{ margin: "20px" }}>
          <Link to="/">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
