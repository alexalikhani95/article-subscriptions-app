import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context";

const ProtectedRoute = () => {
  const [state] = useContext(UserContext);

  if (state.loading) return <>Loading...</>;

  return state.data ? <Outlet /> : <Navigate to="/" />; //The outlet component in protected route will render the child route element of the parent
};

export default ProtectedRoute;
