import React from "react";

interface LoginProps {
  text: string;
}

const Login = ({ text }: LoginProps) => {
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
        <button>{text}</button>
      </div>
      <form>
        <div>
          <label>
            Email
            <input type="text" />
          </label>
        </div>

        <div>
          <label>
            Password
            <input type="text" />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
