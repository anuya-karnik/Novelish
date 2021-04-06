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
    </div>
  );
}

export default Home;
