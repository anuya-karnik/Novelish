import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Home  from "./components/home";
import  About  from "./components/about";
import  Search  from "./components/search";
import Navigation from "./components/navigation";

function App() {

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/search" exact component={() => <Search />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

