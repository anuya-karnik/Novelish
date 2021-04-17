import React, { useState } from "react";
import fire from "../fire";

function Home() {

  // https://reactjs.org/docs/hooks-state.html

  const [userInput, setText] = useState('');
  const [userInput1, setText1] = useState('');

  // https://firebase.google.com/docs/database/admin/save-data#getting-the-unique-key-generated-by-push
  const dbpush = evt => {
    // console.log(userInput);
    // console.log(userInput1);
    var userData = {
      'bookname': userInput,
      'author': userInput1
    }
    fire.database().ref('user-input/data1').push(userData);
    setText('');
    setText1('');
  }

  // creates a list of items

  function createList(item) {
    let itemlist = document.getElementById('get-list')
    let listItem = document.createElement('LI')
    listItem.innerHTML = item['bookname'] + ' by ' + item['author']
    console.log(item['bookname'])
    console.log(item['author'])
    itemlist.append(listItem)
  }
  
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
          // console.log(data.val)
          // createList(data.val())
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
      <div className="col-sm-12 text-center">
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

      </div>
      <div className="header container">
        <h1>This is the Headline</h1>
      </div>
      <div className="home container">
        <div className="row">
        <div className="currentread col-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Currently Reading</h5>
                <h6 className="card-subtitle mb-2 text-muted">Space for displaying Info about Currently read book</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div id="readlist" className="toread col-8">
            <div className="list-controls container">
              <div className="col"><h3>My Reading List</h3></div>
              <div className="col"> <button type="button" className="btn btn-primary">Add New Book</button>
              <button type="button" className="btn btn-primary">See Books to Read</button>
              <button type="button" className="btn btn-primary">See Books Completed</button>
            </div> 
            </div>
            {/* Remove this later! */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Card Template</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <button type="button" className="btn btn-primary">Currently Reading</button>
                <button type="button" className="btn btn-success">Done Reading!</button>
                <button type="button" className="btn btn-danger">Remove from List </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
