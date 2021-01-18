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
          <Col></Col>
          <Col xs={8} className="mt-3">
            <div>
              {contact ? <ContactDetails contact={contact} resetContact={updateContact} /> : <ContactsList liftContact={updateContact} />}
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
export default ShowContacts;
