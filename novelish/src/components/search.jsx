import React, { useState } from "react";
import request from 'superagent';

function Search() {

  const [keyword, setText] = useState('')

  // https://developers.google.com/books/docs/v1/using#PerformingSearch

  function getBooks() {
    console.log(keyword)
    request.get('https://www.googleapis.com/books/v1/volumes')
    .query({q: keyword})
    .then((data) => {
      console.log(data)
    })
    setText('')
  }

  return (
    <div className="search">
        <div className="jumbotron text-center">
            <h1>Search page</h1>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 text-center">
                <p>
                Page for Searching Books and Adding them to a To-Read List
                </p>

                </div>
            </div>
        </div>

        <div className="input-database">
      <input
        type="text"
        className="textinput"
        value={keyword}
        onChange={e => setText(e.target.value)} />
      <button className="submit" type="submit" onClick={getBooks}>Submit</button>
    </div>


            

    </div>
  );
}

export default Search;