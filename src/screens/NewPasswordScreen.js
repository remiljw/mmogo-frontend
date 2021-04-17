import { Form,  } from "react-bootstrap";
import React, { useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { confirm_reset } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const NewPasswordScreen = () => {
  const [new_password, setNewPassword] = useState("");
  const { uid, token } = useParams()
  const dispatch = useDispatch();
  const userChange = useSelector((state) => state.userChange);
  const { loading, error, message } = userChange;
  const submitHandler = (e) => { 
    e.preventDefault(); 
    dispatch(confirm_reset(uid, token, new_password));
    setNewPassword('');
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="success">{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={new_password}
            onChange={(e) => setNewPassword(e.target.value)}
            autocomplete="new-password"
          ></Form.Control>
        </Form.Group>
        <button type="submit" className="btn custom-btn-primary">
          Submit
        </button>
      </Form>
    </FormContainer>
  );
};

export default NewPasswordScreen;
