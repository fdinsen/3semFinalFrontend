import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Login from './Login';
import { useHistory } from 'react-router-dom';
import ContactsList from './ContactsList';
import ContactDetails from './ContactDetails';

function ShowContacts(props) {
  const [contact, setContact] = useState(null);

  const updateContact = (c) => {
    setContact(c);
  }

  return (
    <>
      <Container>
        <Row>
          {contact ? <ContactDetails contact={contact} resetContact={updateContact} /> : <ContactsList liftContact={updateContact} />}
        </Row>
      </Container>
    </>
  );
}
export default ShowContacts;
