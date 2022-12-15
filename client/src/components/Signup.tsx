import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import "./login.css";
import { useMutation } from "@tanstack/react-query";

interface UserData {
  email: string;
  password: string;
}

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const [state, setState] = useContext(UserContext);

  const handleSignup = async (signupDetails: UserData) => {
    let response = await axios.post("http://localhost:5001/auth/signup", signupDetails);

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

    localStorage.setItem("token", userData.token); // Store the user token in localstorage
    axios.defaults.headers.common["authorization"] = `bearer ${userData.token}`; // Set axios header to have token

    navigate("/dashboard");
  };

  const { mutate: signupMutation } = useMutation(handleSignup);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutation({ email, password });
  };

  return (
    <div className="login-card">
      <div>
        <h3>Signup</h3>
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
        {errorMsg && <p>{errorMsg}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
