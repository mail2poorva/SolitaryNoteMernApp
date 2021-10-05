import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Pencil from "@mui/icons-material/CreateOutlined";
import "../SASS/Profile/profile.css";
import Plus from "@mui/icons-material/AddRounded";

function Profile() {
  const history = useHistory();
  const [userData, setUserData] = useState(0);
  let name;
  const callAbout = async () => {
    try {
      const res = await fetch("/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      name = data.name;
      setUserData(data);

      console.log(userData.name);
      // window.alert(data.email);
      if (!data.status === 200) {
        const error = new Error(res.error);
        // console.log(error);
      }
    } catch (e) {
      console.log(e);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAbout();
  }, []);

  return (
    <form method="GET">
      <div className="profile">
        <div className="profile-part-1">
          <div className="box1">
            <div className="box1-img">
              <div className="changeimg">
                <Button>
                  <Plus />
                </Button>
              </div>
            </div>
            <div>
              <h1>{userData.name}</h1>
              <h3>{userData.work}</h3>
            </div>
          </div>
          <Button className="editbtn" variant="contained">
            <Pencil fontSize="small" />
            Edit Profile
          </Button>
        </div>
        <div className="profile-part-2">
          <div className="part">
            <h1 className="part-heading">About</h1>
            <div className="part-details">
              <div className="part-details-item">
                <div>
                  <p>User Id</p>
                  <br />
                  <p>Name</p>
                  <br />
                  <p>Email</p>
                  <br />
                  <p>Work</p>
                  <br />
                  <p>Phone Number</p>
                  <br />
                </div>
                <span>
                  <p>{userData._id}</p>
                  <br />
                  <p>{userData.name}</p>
                  <br />
                  <p>{userData.email}</p>
                  <br />
                  <p>{userData.work}</p>
                  <br />
                  <p>{userData.phone}</p>
                  <br />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Profile;
