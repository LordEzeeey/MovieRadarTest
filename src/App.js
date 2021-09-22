import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Landingpage from "./components/Landingpage";
import Login from "./components/Login";
import Post from "./components/Post";
import Signin from "./components/Signin";
import Upload from "./components/Upload";
import Actionpage from "./components/categories/Actionpage";
import Comedypage from "./components/categories/Comedypage";
import Horrorpage from "./components/categories/Horrorpage";
import Seriespage from "./components/categories/Seriespage";
import Animatedpage from "./components/categories/Animatedpage";
import SuperHero from "./components/categories/Superhero";
import Nollywood from "./components/categories/Nollywood";
import Adventurepage from "./components/categories/Adventurepage";

// components import

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>

          <Route path="/posts">
            <Post />
          </Route>

          <Route path="/action">
            <Actionpage />
          </Route>

          <Route path="/horror">
            <Horrorpage />
          </Route>

          <Route path="/adventure">
            <Adventurepage />
          </Route>

          <Route path="/nollywood">
            <Nollywood />
          </Route>

          <Route path="/superhero">
            <SuperHero />
          </Route>

          <Route path="/animations">
            <Animatedpage />
          </Route>

          <Route path="/comedy">
            <Comedypage />
          </Route>

          <Route path="/series">
            <Seriespage />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            <Landingpage />
          </Route>

          <Route path="/signin">
            <Signin />
          </Route>

          <Route path="/upload">
            <Upload />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
