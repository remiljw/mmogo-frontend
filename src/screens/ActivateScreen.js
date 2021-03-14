import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { activate } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const ActivateScreen = ({history, location}) => {
  const dispatch = useDispatch();
  const userActivate = useSelector((state) => state.userActivate);
  const { loading, error, message } = userActivate;
  const redirect = location.search ? location.search.split("=")[1] : "/login";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (message) {
      setTimeout(() => history.push(redirect), 3000);
    }
  }, [history, message, redirect]);  
  const { uid, token } = useParams()
  useEffect(()=> { 
    
      dispatch(activate(uid, token));
    },[dispatch, token, uid])

  

  return (
    <FormContainer>
        {message && <Message variant="success">{message}</Message>}
         {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
    </FormContainer>
  );
};

export default ActivateScreen;
