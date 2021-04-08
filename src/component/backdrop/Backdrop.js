import './backdrop.css';

function Backdrop(prop) {
  return (
    <div className="backdrop" onClick={() => prop.setOpen(false)}></div>
  )
}

export default Backdrop
