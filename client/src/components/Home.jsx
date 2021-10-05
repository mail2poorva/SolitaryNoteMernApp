import React, { useState, useEffect, useRef } from "react";
import "../SASS/Home/home.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

function Home() {
  const history = useHistory();
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  // this is the code to add blog data to the data base

  const [data, setdata] = useState({
    title: "",
    description: "",
  });

  // Login status
  const [loggedIN, setloggedIN] = useState({ status: false, name: "" });

  // const [addData, setaddData] = useState([{}]);

  const [addData, setaddData] = useState([{}]);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata({
      ...data,
      [name]: value,
    });
  };

  // now we have to get the data of the blog on our screen from server

  const GetBlog = async () => {
    try {
      const res = await fetch("/getblog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const inputdata = await res.json();
      const blogdata = inputdata.blogs;
      setaddData(blogdata);
      setloggedIN({ status: true, name: inputdata.name });

      if (!res.status === 200) {
        const error = new Error(res.error);
        console.log(error);
        alert(error);
      }
    } catch (e) {
      console.log("error from the get method of blog  " + e);
    }
  };

  // GetBlog();

  useEffect(() => {
    GetBlog();
  }, []);

  const submitform = async (e) => {
    e.preventDefault();

    const { title, description } = data;

    const res = await fetch("/blogpost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    const inputdata = await res.json();
    // console.log(inputdata);

    if (inputdata.error != undefined) {
      alert(inputdata.error);
    } else {
      alert("Note added successfully");
      setdata({ ...data, title: "", description: "" });
      setaddData([...addData, data]);
      GetBlog();
    }
  };

  const Note = () => {
    return (
      <div className="note-grid">
        {addData.map((val, id) => {
          return (
            <div className="note-grid-item">
              <p className="date">{val.date}</p>
              <h4 className="title">{val.title}</h4>
              <p className="description">{val.description}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="homepage">
        {loggedIN.status ? (
          <h1 className="homepage-h1">
            Hi {loggedIN.name} Happy to see you here
          </h1>
        ) : (
          <h1 className="homepage-h1">
            Please login to see your notes or Sign up to make some
          </h1>
        )}

        <fieldset className="homepage-fieldset">
          <legend>Add your note here</legend>

          {loggedIN.status ? (
            <Button variant="contained" onClick={executeScroll}>
              Click me to add
            </Button>
          ) : (
            <Button variant="contained" onClick={() => history.push("/login")}>
              Click to login
            </Button>
          )}
        </fieldset>
      </div>

      {/* Notes Area */}

      {loggedIN.status ? (
        <>
          <fieldset className="form" ref={myRef}>
            <legend>Add here</legend>
            <form method="post" className="form-main">
              <div className="label-box">
                <label>Title</label>
                <label>Description</label>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="title"
                  onChange={handleInputs}
                  value={data.title}
                  placeholder="Title"
                  className="input-box-item"
                />

                <textarea
                  rows="5"
                  type="text"
                  name="description"
                  className="input-box-text"
                  onChange={handleInputs}
                  placeholder="Description"
                  value={data.description}
                ></textarea>
              </div>

              <Button
                variant="contained"
                type="submit"
                onClick={submitform}
                className="btn"
              >
                Submit
              </Button>
            </form>
          </fieldset>

          <Note />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Home;
