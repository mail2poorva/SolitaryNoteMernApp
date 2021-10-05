import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import "../SASS/Login/login.css";
import LoginPic from "../images/login.png";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert(data.error);
    } else {
      window.alert(data.message);
      // console.log(data);
      history.push("/");
    }
  };

  return (
    <>
      <div className="Login">
        <div className="Login-form">
          <div className="Login-form-1">
            <form className="formdetails">
              <h1>Login</h1>

              <div className="formdetails-part">
                <label>Email</label>

                <input
                  type="email"
                  id="input"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="formdetails-part">
                <label>Password</label>

                <input
                  type="password"
                  id="input"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                id="submit"
                variant="contained"
                onClick={loginUser}
              >
                Submit
              </Button>
              <div className="formdetails-already">
                Create <Link to="/signup">Account</Link>
              </div>
            </form>
          </div>
          <div className="Login-form-2">
            <img src={LoginPic} alt="RegistrationImg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
