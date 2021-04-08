import React, { useState, useEffect } from "react";
import Modal from "../component/modal/Modal";
import axios from "axios";
import EventList from "./EventList";
import Loading from "../component/Loading/Loading";


export default function EventPage() {
  const [open, setopen] = useState(false);
  const [events, setevents] = useState(null);
  const [loading, setloading] = useState(false);

  // get token from localstorage
  const token = localStorage.getItem('token');

  function fetchEvent() {
    const resBody = {
      query: `
     query {
         events{
           _id
           title
           description
           price
           date
           creator {
              _id
           }
         }
     }
     `,
    };

  setloading(true);
    // fetching events
    axios({
      method: "POST",
      url: "http://localhost:4000/graphql",
      data: resBody,
    })
      .then((res) => {
        setevents(res.data.data.events);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        throw err;
      });
  }

  // fetching event on every reder
  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <>
      <Modal open={open} setopen={setopen} fetchEvent={fetchEvent}>
        <p>Modal content</p>
      </Modal>

      {token && (
        <div className="event_container">
          <p style={{ textAlign: "center" }}>Share your own Events!</p>
          <button className="create_event_btn" onClick={() => setopen(!open)}>
            Create Event
          </button>
        </div>
      )}

      {
         loading ? <Loading />  :
         <div className="Event_lists">
            <EventList events={events} />
          </div>
      }

    </>
  );
}
