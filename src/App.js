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

          <Route exact path="/posts">
            <Post />
          </Route>

          <Route exact path="/action">
            <Actionpage />
          </Route>

          <Route exact path="/horror">
            <Horrorpage />
          </Route>

          <Route exact path="/adventure">
            <Adventurepage />
          </Route>

          <Route path="/nollywood">
            <Nollywood />
          </Route>

          <Route exact path="/superhero">
            <SuperHero />
          </Route>

          <Route exact path="/animations">
            <Animatedpage />
          </Route>

          <Route exact path="/comedy">
            <Comedypage />
          </Route>

          <Route exact path="/series">
            <Seriespage />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            <Landingpage />
          </Route>

          <Route exact path="/signin">
            <Signin />
          </Route>

          <Route exact path="/upload">
            <Upload />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
