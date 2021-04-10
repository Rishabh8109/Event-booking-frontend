import React, { useEffect, useState } from "react";
import axios from 'axios';
import Loading from '../component/Loading/Loading'
import '../styles/event.css';
import BookingList from "../component/Bookings/BookingList";

export default function BookingPage() {
  const [loading, setloading] = useState(false);
  const token = localStorage.getItem('token');
  const [bookings, setbookings] = useState([]);
  let isActive = true;


  // get booking on every render
  useEffect(() => {
    if(isActive){
      fetchBookings();
    }
    // unmounting component
    return () => {
      isActive = false;
    }
  }, [])

  // functoin defination
  function fetchBookings() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      query: `
        query {
          bookings{
              _id
              event {
                _id
                title
                description
                price
                date
              }
              createdAt
              updatedAt
          }
        }
   `,
    };

    // setloading
    setloading(true);
    axios({
      method: "POST",
      url: "http://localhost:4000/graphql",
      headers: headers,
      data : requestBody
    })
      .then((res) => {
        setloading(false);
        setbookings(res.data.data.bookings);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }


  return (
    <>
     {bookings.length === 0 && !loading  &&  <div className="empty">Empty Bookings ! </div>}
      {
        loading ? <Loading /> :
          <div className="event_list">
          <ul>
              {
                bookings && bookings.map(({_id, event , createdAt}) => (
                   <BookingList
                     event={event}
                     createdAt={createdAt}
                     key={_id}
                     bookingId={_id}
                     fetchBookings={fetchBookings}
                     setloading={setloading}
                   />
                ))
              }
          </ul>
        </div>
      }
    </>
  );
}
