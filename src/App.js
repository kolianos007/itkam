import React from "react";
import classes from "./App.module.css";
import Profile from "./components/Profile/Profile";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

const App = () => {
  return (
    <BrowserRouter>
      <div className={classes["app-wrapper"]}>
        <Header />
        <Navbar />
        <div className={classes["app-wrapper-content"]}>
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/profile" render={() => <Profile />} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
