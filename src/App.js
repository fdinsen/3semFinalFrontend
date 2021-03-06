import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import facade from './apiFacade';
import ShowContacts from './components/ShowContacts';
import CreateContact from './components/CreateContact';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = facade.getUser();
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <Switch>
        <Route exact path="/">
          <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/contacts">
          <ShowContacts/>
        </Route>
        <Route path="/create">
          <CreateContact/>
        </Route>
        <Route path="/404">
          <NoMatch />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </>
  );
}
export default App;

function NoMatch() {
  return (
    <div>
      <h2>Page not found</h2>
    </div>
  );
}
