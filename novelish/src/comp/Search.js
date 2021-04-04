import React, {Component}  from 'react';
import '../App.css';

function Search() {


  return (
    <div className="search">
        <h3>Space for the Search Bar.</h3>
        <p>Possibly can be used to render the search results</p>
        <div className="search-bar">
          <form action="">
            <input 
            type="text"
            placeholder="Search..."/>
            <button type="submit">Submit</button>
          </form>
        </div>


    </div>
  );
}

export default Search;
