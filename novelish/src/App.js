import React from 'react';
import Home from './comp/Home';
import Nav from './comp/Nav';
import Search from './comp/Search'
import './App.css';

/*
My only question is how to change the 'home' components to 'search' when the user
uses the search tab
*/
function App() {
  return (
    <div className="App">
      <Nav/>
      <Search/>
      <Home/>
    </div>
  );
}

export default App;
