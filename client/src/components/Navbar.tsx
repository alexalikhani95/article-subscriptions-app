import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context";

const NavBar = () => {
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ borderBottom: "1px solid blue", display: "flex" }}>
      <div style={{ margin: "20px" }}>
        <Link to="/">Home</Link>
      </div>
      {state.data && ( // If there is something in localstorage (token in this case) show the logout
        <div style={{ margin: "20px", cursor: "pointer" }}>
          <div onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
