import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import "../SASS/Contact/contact.css";
const Contact = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      // console.log(userData.name);

      if (!res.status === 200) {
        const error = new Error(res.error);
        console.log(data.error);
        alert(data.error);
      }
    } catch (e) {
      console.log(e);
      history.push("/login");
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  // here we are storing the data in object type
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contactform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, message }),
    });

    const data = await res.json();
    // console.log(data.error);
    if (data.error != undefined) {
      console.log(data.error);
      alert(data.error);
    } else {
      console.log("Message sent");
      alert("Message sent");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <div className="contact">
      <div className="contact-firsthalf">
        <div className="contact-firsthalf-1">
          <h3 className="contact-h3">Contact Us</h3>
          <h1 className="contact-h1">
            Let's Talk <br />
            about you
          </h1>
        </div>
        <div className="contact-firsthalf-2">
          <div className="part">
            <h2>Get in Touch</h2>
            <form className="part-form" method="post">
              <div className="part-small">
                <label>Name</label>

                <input
                  type="text"
                  id="input"
                  name="name"
                  value={userData.name}
                  onChange={handleInputs}
                />
              </div>
              <div className="part-small">
                <label>Email</label>

                <input
                  type="email"
                  id="input"
                  name="email"
                  value={userData.email}
                  onChange={handleInputs}
                />
              </div>
              <div className="part-small">
                <label>Phone Number</label>

                <input
                  type="number"
                  id="input"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputs}
                />
              </div>
              <div className="part-small">
                <label>Message</label>

                <textarea
                  type="text"
                  id="input"
                  name="message"
                  required
                  value={userData.message}
                  onChange={handleInputs}
                ></textarea>
              </div>

              <Button
                type="submit"
                id="submit"
                variant="contained"
                onClick={contactForm}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="contact-secondhalf">
        <div className="contact-secondhalf-part">
          <h1>Phone</h1>
          <p>+19(20202920)</p>
        </div>
        <div className="contact-secondhalf-part">
          <h1>Email Us</h1>
          <p>travelistablog.mail.co</p>
        </div>
        <div className="contact-secondhalf-part">
          <h1>Address</h1>
          <p>Delhi, India</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
