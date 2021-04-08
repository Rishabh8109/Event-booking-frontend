import React , {useState} from 'react';
import EventModal from '../component/modal/EventModal';
import "../styles/event.css";

function EventList(props) {
  const token = localStorage.getItem("token");
  const localStorage_userId = localStorage.getItem("userId");
  const [eventDetails, seteventDetails] = useState(null);
  const [open, setopen] = useState(false)
  const { events } = props;

  // show details
  const showDetails = (eventId) => {
    const event_details  = events.filter(e =>  e._id === eventId);
    seteventDetails(event_details);
    setopen(true);
  }
  
  return (
    <div>
      <EventModal
       open={open}
       setopen={setopen}
       eventDetails={eventDetails}
      />
      <div className="event_list">
        <ul>
          {events &&
            events.map(({ _id, title, price, creator }) => (
              <li key={_id} className="event-list-item">
                <div>
                  <h3>{title}</h3>
                  <p>${price}</p>
                </div>
                <div>
                  {creator._id === localStorage_userId ? (
                    <p>you are the owner of this event</p>
                  ) : (
                    <button onClick={() => showDetails(_id)}>View Details</button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default EventList;
