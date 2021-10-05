import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import "../SASS/register/register.css";
import RegisterPic from "../images/register.png";

function Register() {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    // console.log(e);
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, work, password, cpassword }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      window.alert(data.error);
      console.log("Invalid Registration");
    } else {
      window.alert(data.message);
      console.log("Registration successfully");
    }

    history.push("/login");
  };

  return (
    <>
      <div className="register">
        <div className="register-form">
          <div className="register-form-1">
            <form className="formdetails" method="post">
              <h1>Sign Up</h1>
              <div className="formdetails-part">
                <label>Name</label>

                <input
                  type="text"
                  id="input"
                  required
                  value={user.name}
                  onChange={handleInputs}
                  name="name"
                />
              </div>
              <div className="formdetails-part">
                <label>Email</label>

                <input
                  type="email"
                  id="input"
                  required
                  value={user.email}
                  onChange={handleInputs}
                  name="email"
                />
              </div>
              <div className="formdetails-part">
                <label>Phone Number</label>

                <input
                  type="number"
                  id="input"
                  required
                  value={user.phone}
                  onChange={handleInputs}
                  name="phone"
                />
              </div>
              <div className="formdetails-part">
                <label>Work</label>

                <input
                  type="text"
                  id="input"
                  required
                  value={user.work}
                  onChange={handleInputs}
                  name="work"
                />
              </div>
              <div className="formdetails-part">
                <label>Password</label>

                <input
                  type="password"
                  id="input"
                  required
                  value={user.password}
                  onChange={handleInputs}
                  name="password"
                />
              </div>
              <div className="formdetails-part">
                <label>Confirm Password</label>

                <input
                  type="password"
                  id="input"
                  required
                  value={user.cpassword}
                  onChange={handleInputs}
                  name="cpassword"
                />
              </div>
              <Button
                type="submit"
                id="submit"
                variant="contained"
                onClick={PostData}
              >
                Submit
              </Button>
              <div className="formdetails-already">
                Already Have a Account <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
          <div className="register-form-2">
            <img src={RegisterPic} alt="RegistrationImg" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

// name: name,
// email: email,
// phone: phone,
// work: work,
// password: password,
// cpassword: cpassword,
