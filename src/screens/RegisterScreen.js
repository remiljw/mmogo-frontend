import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import React, { useState,} from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const RegisterScreen = ({ history, location }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, message } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/login";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password));
    setUserName('');
    setEmail('');
    setPassword('');
  };
  
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="success">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          ></Form.Control>
        </Form.Group>
        <button type="submit" className="btn custom-btn-primary">
          Register
        </button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?
          <Link
            className="ml-1"
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
