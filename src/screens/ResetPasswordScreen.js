import { Form, } from "react-bootstrap";
import React, { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { reset } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userReset = useSelector((state) => state.userReset);

  const { loading, error, user } = userReset;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(reset(email));
    setEmail('');
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {error && <Message variant="danger">{error}</Message>}
      {user && <Message variant="info">{user}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <button type="submit" className="btn custom-btn-primary">
          Reset
        </button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordScreen;
