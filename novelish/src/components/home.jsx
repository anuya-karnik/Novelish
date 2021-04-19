import React from "react";
import fire from "../fire";

function Home() {

  window.addEventListener('load', event => {
    console.log('dbget called')
    dbget()
    updateCurrentBook()
  })
  let once = 0;
  document.getElementById('refresh').addEventListener('click', function(){
    if(once === 0) {
      console.log('dbget called')
      dbget()
      updateCurrentBook()
      once = 1;
    }
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

  function addCurBook(bookname, author, image) {

    // remove current book from currently reading file
    var curData = {
      'image': image,
      'bookname': bookname,
      'author': author
    }

    console.log(bookname, author, image)

    let curBookRef = fire.database().ref('user-input/curRead')
    curBookRef.remove()
      .then(function () {
        console.log("Previous Book Removed")
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      })

    curBookRef.push(curData)
    console.log('new book added')

    updateCurrentBook()

  }

  function updateCurrentBook() {

    let curBookRef = fire.database().ref('user-input/curRead')

    curBookRef.on('value',
      function (snapshot) {
        console.log(snapshot.val())
        snapshot.forEach(function (data) {
          //only has one book
          let book = data.val()
          console.log('got book:' + book['author'], book['bookname'])

          let curImage = document.getElementById('current-image')
          curImage.src = book['image']

          let curTitle = document.getElementById('current-bookname')
          curTitle.innerHTML = book['bookname']
          console.log(book['bookname'])

          let curAuthor = document.getElementById('current-author')
          curAuthor.innerHTML = book['author']
          console.log(book['author'])
          //get the book from the database
        })
      },

      function (errorObject) {
        console.log("The read failed" + errorObject.code)
      })
  }

  function removeBook(key) {
    // let remCard = document.getElementById(key)
    let remBookRef = fire.database().ref('user-input/data1/' + key)
    remBookRef.remove()
      .then(function () {
        console.log("Book Removed From List")
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      })

    window.location.reload(true);
  }

  function doneBook(key) {
    let doneCard = document.getElementById(key)
    console.log('done reading with ' + key)
    doneCard.style.backgroundColor = "#C7E5D3"
  }

  function createCards(item, key) {
    //readlist column
    let readlist = document.getElementById('readlist')

    //card id
    let card_id = document.createElement('div')
    card_id.style = 'display:none'
    card_id.innerHTML = key

    let card = document.createElement('div')
    card.className = ('card')
    card.id = key

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
    curRead.onclick = function () {
      console.log(item)
      addCurBook(item["bookname"], item["author"], item["picture"]);
    }

    let doneRead = document.createElement('button')
    doneRead.type = 'button'
    doneRead.className = 'btn btn-success'
    doneRead.innerHTML = 'Done Reading!'
    //TODO: doneRead onClick function goes here
    doneRead.onclick = function () {
      doneBook(key);
    }

    let remRead = document.createElement('button')
    remRead.type = 'button'
    remRead.className = 'btn btn-danger'
    remRead.innerHTML = 'Remove from List'
    //TODO: curRead onClick function goes here
    remRead.onclick = function () {
      removeBook(key);
    }

    if (readlist) {
      readlist.append(card)
    }
    card.append(cardBody)
    cardBody.append(cardTitle)
    cardBody.append(cardSubtitle)
    cardBody.append(curRead)
    cardBody.append(doneRead)
    cardBody.append(remRead)
  }

  // https://firebase.google.com/docs/database/admin/retrieve-data#orderbychild
  function dbget() {
    console.log('reached in dbget')
    fire.database().ref('user-input/data1').on('value',

      function (snapshot) {
        console.log(snapshot.val())
        snapshot.forEach(function (data) {
          setTimeout(createCards(data.val(), data.key), 3000)
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
      <div className="jumbotron text-center" style={{ backgroundImage: "url(/book.jpeg)" }}>
        {/* <img class="bg" src="book.jpeg"></img> */}
        <div class="overlay">
          <h1 class="welcome">Welcome to Novelish <span class="blink"> |</span></h1>
          <h3>Your Space to Read, Grow and Explore</h3></div>

      </div>
      <div className="home container">
        <div className="row">
          <div id="current-card" className="currentread col-4">

            <div className="card mb-3">
              <img id="current-image" src="Sample-Image.png" className="card-img-top" alt="sample" />
              <div className="left card-body">
                <h5 id='current-bookname' className="card-title mb-3">Currently Read Book Title</h5>
                <h6 id='current-author' className="card-subtitle mb-2 text-muted">Currently Read Book Title</h6>
                {/* Maybe Use a Library for Saving Updated Time */}
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
          <div id="readlist" className="toread col-8">
            <div className="list-controls">
              <h3 className="col">My Reading List</h3>
              <div className="col">
                <button id='refresh-once' type="button" className="add btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                </svg></button>
                <button type="button" className="add btn btn-primary"> + Add New Book</button>
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