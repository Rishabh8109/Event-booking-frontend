import React from "react";
import Backdrop from "../backdrop/Backdrop";
import "./Modal.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

function EventModal(props) {
  const { eventDetails, open, setopen } = props;
  const token = localStorage.getItem("token");
  const history = useHistory();

  const bookEvent = (eventId) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      query: `
       mutation {
         bookEvent(eventId : "${eventId}"){
            createdAt
            updatedAt
         }
       }
     `,
    };

    axios({
      method: "POST",
      url: "http://localhost:4000/graphql",
      headers: headers,
      data: JSON.stringify(requestBody),
    })
      .then((res) => {
        history.push('/bookings')
      })
      .catch((err) => {
        throw err;
      });
  };

  const bookingHandler = (eventId) => {
    if (token) {
      bookEvent(eventId);
    } else {
      history.push("/auth");
    }
    // after booking the event close the modal
    setopen(false);
  };

  return (
    <div className="modal2" style={{ display: open ? "block" : "none" }}>
      <Backdrop setOpen={setopen} />
      <div className="modal_container" style={{ height: "350px" }}>
        {eventDetails &&
          eventDetails.map(({ _id, title, description, price, date }) => (
            <div key={_id}>
              <div className="modal-header">
                <p>{title}</p>
                <p onClick={() => setopen(false)}>x</p>
              </div>
              <div className="modal-body">
                <h2 className="title">{title}</h2>
                <p className="price">${price}</p>
                <p className="date">{new Date(date).toLocaleDateString()}</p>
                <p className="description">{description}</p>
              </div>
              <div className="modal-footer">
                <div className="event-action">
                  <button onClick={() => setopen(false)}>cancel</button>
                  <button onClick={() => bookingHandler(_id)}>Book</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EventModal;
