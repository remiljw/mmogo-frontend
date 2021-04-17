import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ history, location }) => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="current-password"
          ></Form.Control>
        </Form.Group>
        <button type="submit" className="btn custom-btn-primary">
          Sign In
        </button>
      </Form>

      <Row className="py-3">
        <Col>
          Not yet a member?{" "}
          <Link
            to={redirect ? `/signup` : "/signup"}
            className="ml-l"
          >
            Sign up here
          </Link>
        </Col>
        <Col>
          <Link
            to={redirect ? `/reset` : "/reset"}
            className="ml-l"
          >
           Reset Password
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
