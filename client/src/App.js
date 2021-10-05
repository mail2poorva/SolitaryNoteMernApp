import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { Route, Switch } from "react-router-dom";
import Contact from "./components/Contact";
import Logout from "./components/Logout";
import Error404 from "./components/Error404";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route>
          <Error404 />
        </Route>
      </Switch>
    </>
  );
};

export default App;
