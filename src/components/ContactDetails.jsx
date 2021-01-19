import React, { useState } from 'react';
import { Col, Container, Row, Button, Table, Card } from 'react-bootstrap';
import Login from './Login';
import { useHistory } from 'react-router-dom';
import ContactsList from './ContactsList';
import AddOpportunity from './AddOpportunity';

function ContactDetails(props) {

    const [displayingOpportunity, setDisplayingOpportunity] = useState(false);

    const backHandler = () => {
        props.resetContact(null);
    }

    const opportunityHandler = () => {
        setDisplayingOpportunity(true);
    }

    const resetDisplayingOpportunity = () => {
        setDisplayingOpportunity(false);
    }

    const BuildList = () => {
        return (
            <>
                {props.contact.opportunities.map(o => {
                    return (
                        <tr key={o.id} data-rowid={o.id}>
                            <td>{o.name}</td>
                            <td>{o.amount}</td>
                            <td>{o.closeDate}</td>
                            <td>{o.opportunityStatus}</td>
                        </tr>
                    );
                })
                }

            </>
        );
    }

    return (
        <>
            {displayingOpportunity
                ?
                <AddOpportunity contact={props.contact} back={resetDisplayingOpportunity} />
                :
                <>
                    <h2 style={{ 'text-align': "center" }}>Contact</h2>
                    <Card>
                        <Card.Body>
                            <div>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>Id</td>
                                            <td style={{ 'text-align': "right" }}>{props.contact.id}</td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td style={{ 'text-align': "right" }}>{props.contact.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td style={{ 'text-align': "right" }}>{props.contact.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Company</td>
                                            <td style={{ 'text-align': "right" }}>{props.contact.company}</td>
                                        </tr>
                                        <tr>
                                            <td>Jobtitle</td>
                                            <td style={{ 'text-align': "right" }}>{props.contact.jobtitle}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td style={{ 'text-align': "right" }}>{props.contact.phone}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <h5 style={{ 'text-align': "center" }}>Opportunities</h5>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th>Close Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {<BuildList/>}
                                    </tbody>
                                </Table>
                                <div class="d-flex justify-content-center">
                                    <Button variant="primary" onClick={opportunityHandler} className="m-1">Add Opportunity</Button>
                                    <Button variant="secondary" onClick={backHandler} className="m-1">Back</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>

                </>
            }

        </>
    );
}
export default ContactDetails;
