import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Login from './Login';
import { useHistory } from 'react-router-dom';
import CreateContact from './CreateContact';
import ShowContacts from './ShowContacts';

function Home(props) {
  const history = useHistory();

  useEffect(() => {
    if(props.loggedIn){
      history.push("/contacts");
    }
  },[] )

  return (
    <>
      <Container>
        <Row>
          <Login loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn}></Login>
        </Row>
      </Container>
    </>
  );
}
export default Home;
