import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function BookingList(props) {
  const { event, createdAt, bookingId , fetchBookings , setloading} = props;

  const cancelBookingHanlder = () => {

    const headers = {
      "Content-Type": "application/json",
    };

    const requestBody = {
      query: `
       mutation {
         cancelBooking(bookingId : "${bookingId}"){
            title
         }
       }
     `,
    };

    setloading(true);
    axios({
      method: "POST",
      url: "http://localhost:4000/graphql",
      headers: headers,
      data: JSON.stringify(requestBody),
    })
      .then((res) => {
        setloading(false);
        fetchBookings();
      })
      .catch((err) => {
        setloading(false);
        throw err;
      });

  };
  return (
    <>
      <li className="booked-event-list-item">
        <div>
          <p>{event.title}</p>
          <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <button onClick={cancelBookingHanlder}>cancel</button>
      </li>
    </>
  );
}

export default BookingList;
