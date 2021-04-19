import React, { useState } from "react";
import request from 'superagent';
import fire from "../fire";

function Search() {

  // https://reactjs.org/docs/hooks-state.html
  const [keyword, setText] = useState('')
  let responsedata= "";


  // https://developers.google.com/books/docs/v1/using#PerformingSearch

  function getBooks() {
    console.log(keyword)
    if (keyword){

      request.get('https://www.googleapis.com/books/v1/volumes')
      .query({ q: keyword })
      .then((data) => {
        responsedata = data.body.items;
        let i = 0;
        while(i < responsedata.length){
          createList(responsedata[i], i);
          i += 1;
        }
      })
    setText('')
    }
    else{
      createList("", 0);
    }
   
    
  }


  function createList(item, number) {

    let cardContainer = document.getElementById("card-container");
    let itemlist = document.getElementById('get-list')

    if (number === 0){
      if (cardContainer) {
        cardContainer.innerHTML = "";
        
      }
      
    }

    if (item) {

      let card = document.createElement('div');
      card.className = 'card  align-items-center';

      let cardBody = document.createElement('div');
      cardBody.className = 'card-body shadow-none';

      let title = document.createElement('h5');
      title.innerText = item.volumeInfo["title"];
      title.className = 'card-title';

      let ig = document.createElement('img');
      ig.src = item.volumeInfo.imageLinks["thumbnail"];
      ig.className = 'card-img-top';
      ig.id = 'bookimage';

      let aut = document.createElement('p');
      aut.innerText = item.volumeInfo["authors"];
      aut.className = "text-muted";

      let des = document.createElement('p');
      des.innerText = item.searchInfo["textSnippet"];
      des.className = "text-muted";

      let cat = document.createElement('p');
      cat.innerText = item.volumeInfo["categories"];
      cat.className = "text-muted";


      let btn = document.createElement('button');
      let x = 3;
      btn.className = "btn btn-primary";
      btn.innerHTML = "Add to read list";
      btn.onclick = function (){
        helper(item.volumeInfo["title"], item.volumeInfo["title"]);
      }

      card.appendChild(ig);
      cardBody.appendChild(title);
      cardBody.appendChild(aut);
      cardBody.appendChild(des);
      cardBody.appendChild(cat);
      cardBody.appendChild(btn);
      card.appendChild(cardBody);
      cardContainer.appendChild(card);

    }

    else{
      let listItem = document.createElement('LI')
      listItem.innerHTML = "Please enter a book title to search."
      itemlist.append(listItem)
    }

  }

  function helper(x, y){
    var userData = {
      'bookname': x,
      'author': y
    }
    fire.database().ref('user-input/data1').push(userData);
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
      <div className="col-sm-12 text-center">
        <div className="get-books">
          <input
            type="text"
            className="textinput"
            value={keyword}
            onChange={e => setText(e.target.value)}/>
          <button className="submit" type="submit" onClick={getBooks}>Submit</button>
        </div>
      </div>


      <div id="card-container" className="results-grid">
      </div>
      
      <div className="col-sm-12 text-center" id="results">
        <ul id="get-list" className="output-words"/>
      </div>

      

    </div>
  );
}

export default Search;