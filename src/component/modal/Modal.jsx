import React, { useRef } from "react";
import "./Modal.css";
import Backdrop from "../backdrop/Backdrop";
import "../../pages/Inputs.css";
import axios from 'axios';


function Modal(prop) {
 const token = localStorage.getItem('token');
 const titleRef = useRef();
 const descriptionRef = useRef();
 const priceRef = useRef();
 const dateRef = useRef();


 // create Event handler
 const createEventHandler = (e) => {
   e.preventDefault();
   const title = titleRef.current.value;
   const description = descriptionRef.current.value;
   const price = +priceRef.current.value;
   const date = dateRef.current.value;

   // http headers
   const headers = {
     'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${token}`
   }
   // sending requestBody to server
   let requestBody = {
    query: `
      mutation {
       createEvents(eventInput : {
         title : "${title}"
         description : "${description}"
         price : ${parseFloat(price)}
         date : "${date}"
       }){
         title
         price
       }
   }
 `,
  };

   axios({
     method :'POST',
     url : 'http://localhost:4000/graphql',
     data : JSON.stringify(requestBody),
     headers : headers
   }).then((res) => {
     prop.fetchEvent();
   }).catch((err) => {
      throw err;
   });

 }
  return (
    <div className="modal" style={{ display: prop.open ? "block" : "none" }}>
      <Backdrop setOpen={prop.setopen} />
      <div className="modal_container">
        <div className="modal-header">
          <p>Add Event</p>
          <p onClick={() => prop.setopen(false)}>x</p>
        </div>
        <div className="modal-body">
          <form className="create-event-form" onSubmit={createEventHandler}>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" placeholder="Title" ref={titleRef}/>
            </div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input type="text" id="price" placeholder="Price" ref={priceRef}/>
            </div>
            <div className="form-control">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" placeholder="Date" ref={dateRef}/>
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea placeholder="description" ref={descriptionRef}/>
            </div>
            <div className="modal-footer">
              <button type="submit" onClick={() => prop.setopen(false)}>create event</button>
             </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
