import React, { useState } from 'react';
import { Form, Button, Alert, Container, Col, Row, Card} from 'react-bootstrap';
import facade from '../apiFacade';
import { useHistory } from 'react-router-dom';

function Login(props) {
  const history = useHistory();
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performLogin = (evt) => {
    evt.preventDefault();
    setError(null);
    if (loginCredentials.username !== '' && loginCredentials.password !== '') {
      facade
        .login(loginCredentials.username, loginCredentials.password)
        .then(() => {
          props.setLoggedIn(true);
          history.push('/contacts');
        })
        .catch((err) => {
          if (err.status == 403) {
            setError('Wrong username or password!');
          } else {
            setError('Something went wrong while logging in');
          }
        });
    } else {
      setError('Missing username or password');
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <Container>
      <Row>
        <Col></Col>
      <Col xs={8} className="mt-3" >
        <div>
          <div>
            <h4 style={{ 'text-align': "center" }}>Login</h4>
            <Card>
              <Card.Body>
            <Form onChange={onChange}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  id="username"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id="password" />
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
              <div style={{ 'text-align': 'center' }}>
                <Button variant="primary" type="submit" onClick={performLogin}>
                  Login
                  </Button>
              </div>
            </Form>
            </Card.Body>
            </Card>
            {console.log(props.loggedIn)}
          </div>
        </div>
      </Col>
      <Col></Col>
      </Row>
    </Container>
  );
}
export default Login;
