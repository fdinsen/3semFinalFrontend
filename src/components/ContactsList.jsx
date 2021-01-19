import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Col, Container, Row, Table, Card } from 'react-bootstrap';
import facade from '../apiFacade';
import { useHistory } from 'react-router-dom';

function ContactsList(props) {
    const [contacts, setContacts] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        facade
            .fetchData('/contact/all', 'GET')
            .then((data) => {
                if (data.all.length > 0) {
                    setContacts(data.all);
                }
            })
            .catch((err) => {
                setError(
                    'Something went wrong while fetching data from remote servers, statusCode: ' +
                    err.status
                );
            });
    }, []);

    const handleClick = (evnt) => {
        const contactId = evnt.currentTarget.getAttribute("data-rowid");
        facade.fetchData(`/contact/${contactId}`, 'GET')
        .then((data) => {
            props.liftContact(data);
        })
    }

    const buildList = () => {
        return (
            <>
                <Table hover action>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Jobtitle</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(c => {
                            return (
                                <tr key={c.id} data-rowid={c.id} onClick={handleClick}>
                                    <td>{c.id}</td>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.company}</td>
                                    <td>{c.jobtitle}</td>
                                    <td>{c.phone}</td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                </Table>
            </>
        );
    }

    return (
        <>
            <div>
                <h2 style={{ 'text-align': "center" }}>Contacts</h2>
                <Card>
                    <Card.Body>
                {!contacts ? (<p>No contacts found</p>) : buildList()}
                </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default ContactsList;
