import React from "react";
import Img from "../images/404.webp";
import "../SASS/Error404/Error404.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

const Error404 = () => {
  return (
    <div className="error404">
      <img src={Img} alt="" className="error404-img" />

      <Link to="/" className="link">
        <Button className="error404-btn">
          Back to Home <span className="error404-span">&#8594;</span>
        </Button>
      </Link>
    </div>
  );
};

export default Error404;
