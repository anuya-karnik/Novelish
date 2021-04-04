import React from 'react';
import Home from './comp/Home';
import Nav from './comp/Nav';
import Search from './comp/Search'
import './App.css';

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
