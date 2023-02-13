import React, { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
    };
    const handleShow = () => {setShow(true)};

  /*const handleSubmit = async e => {
    
  };

// if there's a user show the message below
  if (user) {
    return <div>{user.name} is loggged in</div>;
  }
*/
  // if there's no user, show the login form
  return (
    <div>
        <Button className="links" style={{color: "white"}} variant="Link" onClick={handleShow}>Login</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <Form onSubmit={/*handleSubmit*/() => console.log("login")}>
                <Stack gap={3}>
                  <div>
                    <label htmlFor="username">Username </label><br/>
                    <input
                      type="text"
                      value={username}
                      placeholder="enter a username"
                      onChange={({ target }) => setUsername(target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password </label><br/>
                    <input
                      type="password"
                      value={password}
                      placeholder="enter a password"
                      onChange={({ target }) => setPassword(target.value)}
                    />
                  </div>
                </Stack>    
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Abort
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Login
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  );
};

export default Login;
