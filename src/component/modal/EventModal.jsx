import React from "react";
import Backdrop from "../backdrop/Backdrop";
import "./Modal.css";

function EventModal(props) {
  const { eventDetails, open, setopen } = props;

  return (
    <div className="modal2" style={{ display: open ? "block" : "none" }} >
      <Backdrop setOpen={setopen} />
      <div className="modal_container" style={{height : "350px"}}>
        {eventDetails &&
          eventDetails.map(({
            _id,
            title,
            description,
            price,
            date
          }) => (
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
            </div>
          ))}
      </div>
    </div>
  );
}

export default EventModal;
