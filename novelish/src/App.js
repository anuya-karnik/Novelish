import React from 'react';
import Nav from './comp/Nav';
import Search from './comp/Search'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Home  from "./components/home";
import  About  from "./components/about";
import Navigation from "./components/navigation";
/*
My only question is how to change the 'home' components to 'search' when the user
uses the search tab
*/
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;

