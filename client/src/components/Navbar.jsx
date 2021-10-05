import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import "../SASS/Navbar/navbar.css";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { LogoutFun } from "./Logout";
const Navbar = () => {
  const history = useHistory();

  const [widthchange, setwidthchange] = useState(false);
  const changeWidth = () => {
    if (window.scrollY >= 60) {
      setwidthchange(true);
    } else {
      setwidthchange(false);
    }
  };

  window.addEventListener("scroll", changeWidth);

  return (
    <>
      <div className={widthchange ? "nav widthchange" : "nav"}>
        <h1 className="nav-h1">
          <Link to="/" className="nav-link-h1">
            Solitary Notes
          </Link>
        </h1>
        <div className="nav-midpart">
          <Link to="/profile" className="nav-link center-link">
            Profile
          </Link>
          <Link to="/contact" className="nav-link center-link">
            Contact
          </Link>
          <Link to="/logout" className="nav-link center-link">
            Logout
          </Link>
          {/* {<LogoutFun /> ? (
            <Link to="/logout" className="nav-link center-link">
              Logout
            </Link>
          ) : (
            ""
          )} */}
        </div>

        <div className="nav-lastpart">
          <Button
            className="nav-btn"
            variant="contained"
            onClick={() => history.push("/login")}
          >
            Login &nbsp;&nbsp; <LoginOutlinedIcon sx={{ fontSize: "large" }} />
          </Button>

          <Button
            className="nav-btn"
            variant="contained"
            onClick={() => history.push("/signup")}
          >
            Register &nbsp;&nbsp;{" "}
            <VpnKeyOutlinedIcon sx={{ fontSize: "large" }} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

// <Link to="/register" className="nav-link login-link">
//   <Button>Register</Button>
// </Link>
