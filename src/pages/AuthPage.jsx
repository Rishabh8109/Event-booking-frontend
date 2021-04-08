import React, { useState, useRef } from "react";
import "./Inputs.css";
import axios from "axios";
import {useHistory} from 'react-router-dom';

function AuthPage() {

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const emailEl = useRef();
  const passwordEl = useRef();
  const formRef = useRef();
  const history = useHistory();

  // submithandler
  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    // sending requestBody to server
    let requestBody = {
      query: `
        query {
        Login(email :"${email}" , password : "${password}"){
           userId
           token
           refreshToken
           tokenExpiration
        }
     }
   `,
    };

    if(!isLoggedIn) {
      requestBody = {
        query: `
           mutation {
            createUser(userInput : {email :"${email}" , password : "${password}"}){
               _id
               email
           }
         }
        `,
      };
    }

    // creating user
    axios({
      method: "POST",
      url: "http://localhost:4000/graphql",
      data: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
     })
      .then(resData => {
        const token = resData.data.data.Login.token;
        const userId = resData.data.data.Login.userId;

        // save userdata in localstorage
        localStorage.setItem('token' , token);
        localStorage.setItem('userId' , userId);

        // after login push into /events route
        history.push('/events');
        history.go(0);
      })
      .catch((err) => {
        throw err;
      });

    // Reset all input fields
     formRef.current.reset();
  };



  return (
    <div className="container">
      <form className="auth-form" onSubmit={submitHandler} ref={formRef}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            ref={emailEl}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            ref={passwordEl}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setisLoggedIn(!isLoggedIn)}>
            Switch to {isLoggedIn ? "Signup" : "Signin"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthPage;
