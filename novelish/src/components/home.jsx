import React, { useState } from "react";
import fire from "../fire";

function Home() {

  // https://reactjs.org/docs/hooks-state.html

  const [userInput, setText] = useState('');

  // https://firebase.google.com/docs/database/admin/save-data#getting-the-unique-key-generated-by-push
  const dbpush = evt => {
    console.log(userInput);
    fire.database().ref('user-input/data1').push(userInput);
    setText('');
  }

  // creates a list of items

  function createList(item) {
    let itemlist = document.getElementById('get-list')
    let listItem = document.createElement('LI')
    listItem.innerHTML = item
    itemlist.append(listItem)
  }

  // https://firebase.google.com/docs/database/admin/retrieve-data#orderbychild

  function dbget() {
    fire.database().ref('user-input/data1').on('value',

      function (snapshot) {
        console.log(snapshot.val())
        snapshot.forEach(function (data) {
          console.log(data.val)
          createList(data.val())
        })
      },

      function (errorObject) {
        console.log("The read failed" + errorObject.code)
      }
    )
  }

  return (
    <div className="home">
      <div className="jumbotron text-center">
        <h1>Home Page</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 text-center">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
                </p>

          </div>
        </div>
      </div>

      <div className="col-sm-12 text-center">
        <div className="input-database">
          <input
            type="text"
            className="textinput"
            value={userInput}
            onChange={e => setText(e.target.value)} />
          <button className="submit" type="submit" onClick={dbpush}>Submit</button>
        </div>

        <div className="output-database">
          <button className="dataget" onClick={dbget}>Get Item List</button>
          <ul id="get-list" className="output-words">
          </ul>
        </div>

      </div>

      <div className="home container">
        <div className="row">
        <div className="currentread col-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Currently Reading</h5>
                <h6 class="card-subtitle mb-2 text-muted">Space for displaying Info about Currently read book</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </div>
          <div className="toread col-8">
            <div className="list-controls container">
              <div className="col"><h3>My To Read List</h3></div>
              <div className="col"> <button type="button" class="btn btn-primary">Add New Book</button>
              <button type="button" class="btn btn-primary">See Books to Read</button>
              <button type="button" class="btn btn-primary">See Books Completed</button>
            </div> 
            </div>
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Book title</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button type="button" class="btn btn-primary">Currently Reading</button>
                <button type="button" class="btn btn-danger">Remove from List </button>
                <button type="button" class="btn btn-success">Done Reading!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Home;
