import React, { useState } from "react";
import fire from "../fire";

function Home() {

  const [userInput, setText] = useState('');
  const dbpush = evt => {
      console.log(userInput);
      fire.database().ref('user-input').push(userInput);
      setText(''); 
  }

  

  return (
    <div className="home">
      <div class="jumbotron text-center">
        <h1>Home Page</h1>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
                </p>

          </div>
        </div>
      </div>

      <div className="input-database">
        <input
          type="text"
          className="textinput"
          value={userInput}
          onChange={e => setText(e.target.value)} />
        <button className="submit" type="submit" onClick={dbpush}>Submit</button>
      </div>

      <div className="output-database"></div>

    </div>
  );
}

export default Home;
