import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import "./navbar.css";

const NavBar = () => {
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <div>
        <Link to="/" className="navbar-link">
          Home
        </Link>
      </div>
      {state.data && ( // If there is something in localstorage (token in this case) show the logout
        <div style={{ marginLeft: "20px", cursor: "pointer" }}>
          <div onClick={handleLogout} className="navbar-link">
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
