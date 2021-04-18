import React, { useState } from "react";
import fire from "../fire";

function Home() {
  window.addEventListener('load', (event) => {
    dbget();
  })

  // https://reactjs.org/docs/hooks-state.html

  // const [userInput, setText] = useState('');
  // const [userInput1, setText1] = useState('');

  // https://firebase.google.com/docs/database/admin/save-data#getting-the-unique-key-generated-by-push
  // const dbpush = evt => {
  //   // console.log(userInput);
  //   // console.log(userInput1);
  //   var userData = {
  //     'bookname': userInput,
  //     'author': userInput1
  //   }
  //   fire.database().ref('user-input/data1').push(userData);
  //   setText('');
  //   setText1('');
  // }

  // creates a list of items

  function createCards(item) {
    //readlist column
    let readlist = document.getElementById('readlist')

    let card = document.createElement('div')
    card.className = ('card')

    let cardBody = document.createElement('div')
    cardBody.className = ('card-body container')

    let cardTitle = document.createElement('h5')
    cardTitle.className = ('card-title')
    cardTitle.innerHTML = item['bookname']

    let cardSubtitle = document.createElement('h6')
    cardSubtitle.className = ('card-subtitle mb-2 text-muted')
    cardSubtitle.innerHTML = item['author']

    let curRead = document.createElement('button')
    curRead.type = 'button'
    curRead.className = 'btn btn-primary'
    curRead.innerHTML = 'Currently Reading'
    //TODO: curRead onClick function goes here

    let doneRead = document.createElement('button')
    doneRead.type = 'button'
    doneRead.className = 'btn btn-success'
    doneRead.innerHTML = 'Done Reading!'
    //TODO: curRead onClick function goes here

    let remRead = document.createElement('button')
    remRead.type = 'button'
    remRead.className = 'btn btn-danger'
    remRead.innerHTML = 'Remove from List'
    //TODO: curRead onClick function goes here

    readlist.append(card)
    card.append(cardBody)
    cardBody.append(cardTitle)
    cardBody.append(cardSubtitle)
    cardBody.append(curRead)
    cardBody.append(doneRead)
    cardBody.append(remRead)
  }

  // https://firebase.google.com/docs/database/admin/retrieve-data#orderbychild
  function dbget() {
    fire.database().ref('user-input/data1').on('value',

      function (snapshot) {
        console.log(snapshot.val())
        snapshot.forEach(function (data) {
          createCards(data.val())
        })
      },

      function (errorObject) {
        console.log("The read failed" + errorObject.code)
      }
    )
  }

  return (
    <div className="home">

      {/* TESTING DATABASE */}
      {/* <div className="col-sm-12 text-center">
        <div className="input-database">
          <input
            type="text"
            className="textinput"
            value={userInput}
            onChange={e => setText(e.target.value)} />
          <input
            type="text"
            className="textinput"
            value={userInput1}
            onChange={e => setText1(e.target.value)} />
          <button className="submit" type="submit" onClick={dbpush}>Submit</button>
        </div>

        <div className="output-database">
          <button className="dataget" onClick={dbget}>Show Read List</button>
          <ul id="get-list" className="output-words">
          </ul>
        </div>

      </div> */}
      <div className="jumbotron text-center">
      {/* <img src="book.jpeg" alt= "book"> */}
        <h1>Welcome to Novelish</h1>
        <h3>Your Space to Read, Grow and Explore</h3>
        
      </div>
      <div className="home container">
        <div className="row">
          <div className="currentread col-4">
            <div className="card mb-3">
              <img src="Sample-Image.png" className="card-img-top" alt="sample" />
              <div className="left card-body">
                <h5 className="card-title mb-3">Currently Read Book Title</h5>
                <h6 className="card-subtitle mb-2 text-muted">Currently Read Book Title</h6>
                {/* Maybe Use a Library for Saving Updated Time */}
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
          <div id="readlist" className="toread col-8">
            <div className="list-controls">
              <h3 className="col">My Reading List</h3>
              <div className="col"> <button type="button" className="add btn btn-primary"> + Add New Book</button>
                <button type="button" className="read btn btn-primary">To Read</button>
                <button type="button" className="complete btn btn-primary">Books Completed</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
