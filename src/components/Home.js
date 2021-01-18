import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Login from './Login';
import { useHistory } from 'react-router-dom';
import CreateContact from './CreateContact';
import ShowContacts from './ShowContacts';

function Home(props) {
  return (
    <>
      <Container>
        <Row>
        <CreateContact/>
        <ShowContacts/>
        </Row>
      </Container>
    </>
  );
}
export default Home;
