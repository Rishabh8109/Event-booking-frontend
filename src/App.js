import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./component/Navigation/Navbar";
import AuthPage from "./pages/AuthPage";
import EventPage from "./pages/EventPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";


function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <>
        <Navbar />
          <main>
            <Switch>
              {!token && <Redirect from="/" to="/auth" exact />}
              {token && <Redirect from="/" to="/events" exact/>}
              {token && <Redirect from="/auth" to="/events" exact/>}
              <Route path="/auth" component={AuthPage} />
              <Route path="/events" component={EventPage} />
              <Route path="/bookings" component={BookingPage} />
            </Switch>
          </main>
      </>
    </Router>
  );
}

export default App;
