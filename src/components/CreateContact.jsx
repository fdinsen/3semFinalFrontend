import React, { useState } from 'react';
import { Form, Button, Alert, Col, Container, Row } from 'react-bootstrap';
import facade from '../apiFacade';
import { useHistory } from 'react-router-dom';

function CreateContact(props) {
    const initialValue = {
        name: "",
        email: "",
        company: "",
        jobtitle: "",
        phone: ""
    }
    const [contact, setContact] = useState(initialValue);
    const [dataFromServer, setDataFromServer] = useState(null);
    const [error, setError] = useState(null);

    const onChange = (evt) => {
        setDataFromServer(null);
        setError(null);
        setContact({
            ...contact,
            [evt.target.id]: evt.target.value,
        });
    };

    const performSubmit = (evnt) => {
        evnt.preventDefault();
        facade.postContent("/contact", contact).then((data) => {
            setDataFromServer(data);
        }).catch((err) => {
            if (err.status == 400) {
              setError('All fields must be filled.');
            } else {
              setError('Something went wrong while logging in');
            }
          });
    }
    const displaySuccessMessage = () => {
        return (
            <>
                <Alert variant="success">
                    Contact {dataFromServer.name} created successfully
                </Alert>
            </>
        );
    }

    return (
        <>
            <div>
                <h1>Create Contact</h1>
                {dataFromServer && displaySuccessMessage()}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onChange={onChange}>
                    <Form.Group>
                        <Form.Label>Contact Name</Form.Label>
                        <Form.Control type="text" placeholder="Contact Name" id="name" value={contact.name} >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contact Email</Form.Label>
                        <Form.Control type="text" placeholder="Contact Email" id="email" value={contact.email} >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contact Company</Form.Label>
                        <Form.Control type="text" placeholder="Contact Company" id="company" value={contact.company} >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contact Jobtitle</Form.Label>
                        <Form.Control type="text" placeholder="Contact Jobtitle" id="jobtitle" value={contact.jobtitle} >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contact Phone</Form.Label>
                        <Form.Control type="number" placeholder="Contact Phone" id="phone" value={contact.phone} >
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={performSubmit}>Create</Button>
                </Form>
            </div>
        </>
    );
}
export default CreateContact;
