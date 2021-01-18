import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import Login from './Login';
import { useHistory } from 'react-router-dom';
import ContactsList from './ContactsList';

function ContactDetails(props) {

    const backHandler = () => {
        props.resetContact(null);
    }

    return (
        <>
            <Container>
                <Row>
                    <div>
                        <p>Id: {props.contact.id}</p>
                        <p>Name: {props.contact.name}</p>
                        <p>Email: {props.contact.email}</p>
                        <p>Company: {props.contact.company}</p>
                        <p>Jobtitle: {props.contact.jobtitle}</p>
                        <p>Phone: {props.contact.phone}</p>
                        <Button variant="primary" onClick={backHandler}>Back</Button>
                    </div>
                    
                </Row>
            </Container>
        </>
    );
}
export default ContactDetails;
