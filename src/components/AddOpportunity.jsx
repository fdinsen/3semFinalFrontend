import React, { useState } from 'react';
import { Col, Alert, Row, Form, Button, InputGroup, Card } from 'react-bootstrap';
import facade from '../apiFacade';
import { useHistory } from 'react-router-dom';
import ContactsList from './ContactsList';
import ContactDetails from './ContactDetails';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function ShowContacts(props) {
    const initialValue = {
        name: "",
        amount: 0,
        closeDate: convertDateFormat(new Date()),
        opportunityStatus: "Inactive"
    }
    const [opportunity, setOpportunity] = useState(initialValue);
    const [dataFromServer, setDataFromServer] = useState(null);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());

    const onChange = (evt) => {
        console.log(opportunity)
        setDataFromServer(null);
        setError(null);
        setOpportunity({
            ...opportunity,
            [evt.target.id]: evt.target.value,
        });
    };

    const onDateChange = (dateSelected) => {
        setDate(dateSelected);
        setOpportunity({
            ...opportunity,
            closeDate: convertDateFormat(dateSelected)
        })
    }

    const performSubmit = (evnt) => {
        evnt.preventDefault();
        if (checkFields()) {
            facade.postContent(`/opportunity/${props.contact.id}`, opportunity).then((data) => {
                props.contact.opportunities.push(data);
                props.back();
            }).catch((err) => {
                if (err.status == 400) {
                    setError('All fields must be filled.');
                } else {
                    setError('Something went wrong while logging in');
                }
            });
        }else {
            setError('All fields must be filled.');
        }
    }

    const checkFields = () => {
        if (opportunity.name == ""
            || opportunity.amount == ""
            || opportunity.closeDate == ""
            || opportunity.opportunityStatus == "") {
            return false;
        }
        return true;
    }

    function convertDateFormat(d) {
        return `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
    }

    return (
        <>
            <div>
                <h2 style={{ 'text-align': "center" }}>Create Opportunity for {props.contact.name}</h2>
                <Card>
                    <Card.Body>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onChange={onChange} onSubmit={performSubmit}>
                            <Form.Group>
                                <Form.Label>Opportunity Name</Form.Label>
                                <Form.Control type="text" placeholder="Opportunity Name" id="name" value={opportunity.name}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Payment Amount</Form.Label>
                                <InputGroup className="mb-2">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control type="number" placeholder="Payment Amount" id="amount" value={opportunity.amount}></Form.Control>
                                </InputGroup>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Close Date</Form.Label>
                                        <br />
                                        <DatePicker customInput={<Form.Control />} selected={date} onChange={onDateChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Opportunity Status</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="mr-sm-2"
                                            id="opportunityStatus"
                                            custom >

                                            <option value="Inactive">Inactive</option>
                                            <option value="Won">Won</option>
                                            <option value="Lost">Lost</option>
                                            <option value="Active">Active</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div class="d-flex justify-content-center">
                                <Button variant="primary" type="submit" className="m-1">Create Opportunity</Button>
                                <Button variant="secondary" onClick={props.back} className="m-1">Back</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
export default ShowContacts;
