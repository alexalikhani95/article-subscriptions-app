import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let response;
    const { data: signupData } = await axios.post("http://localhost:5001/auth/signup", {
      email,
      password,
    });
    response = signupData;

    if (response.errors.length) {
      // If there is an error, return the first error in the errors array
      return setErrorMsg(response.errors[0].msg);
    }

    localStorage.setItem("token", response.data.token); // Store the user token in localstorage

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        height: 400,
        width: 300,
        border: "2px solid darkgreen",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h3>Signup</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
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
