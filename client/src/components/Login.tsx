import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import "./login.css";
import { useMutation } from "@tanstack/react-query";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [state, setState] = useContext(UserContext);

  const handleLogin = async (loginDetails: UserData) => {
    let response = await axios.post("http://localhost:5001/auth/login", loginDetails);

    if (response.data.errors.length) {
      // If there is an error, return the first error in the errors array
      return setErrorMsg(response.data.errors[0].msg);
    }

    const userData = response.data.data;

    setState({
      data: {
        id: userData.user.id,
        email: userData.user.email,
        stripeCustomerId: userData.user.stripeCustomerId,
      },
      loading: false,
      error: null,
    });

    axios.defaults.headers.common["authorization"] = `Bearer ${userData.token}`; // Set axios header to have token
    localStorage.setItem("token", userData.token); // Store the user token in localstorage
    navigate("/dashboard");
  };

  const { mutate: loginMutation } = useMutation(handleLogin);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginMutation({ email, password });
  };

  return (
    <div className="login-card">
      <div>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-card-mb">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="login-card-mb">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
