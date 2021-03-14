import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import { Form, Card, Col, Row } from "react-bootstrap";
import { addFavorite, deleteFavorite, } from "../actions/companyAction";
import Message from "./Message";
import Loader from "./Loader";

const CompanyComponent = ({
  companies,
  favorites,
}) => {
  const dispatch = useDispatch();

  const deleteHandler = (e) => {
    e.preventDefault();
    const id = favorites.id;
    dispatch(deleteFavorite(id));
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    const id = companies.id;
    dispatch(addFavorite(id));
  };

  return (
    <>
  {companies ?( 
      <Card>
        {/* <Card.Header>No: {companies.id}</Card.Header> */}
        <Card.Body>
          <Card.Text>
            <b>Name:</b> {companies.name} <br />
            <b>Address:</b> {companies.address} <br />
            <b>Phone:</b> {companies.phone_no}
          </Card.Text>
          <Form onSubmit={submitHandler}>
            <button type="submit" className="btn custom-btn-primary">Add to Favorites</button>
          </Form>
        </Card.Body>
      </Card>)
   :
    <Card>
      {/* <Card.Header>No: {favorites.id}</Card.Header> */}
      <Card.Body>
        <Card.Text>
          Name: {favorites.company.name} <br />
          Address: {favorites.company.address} <br />
          Phone: {favorites.company.phone_no}
        </Card.Text>
        <Form onSubmit={deleteHandler}>
            <button type="submit" className="btn custom-btn-primary">Remove from Favorites</button>
        </Form>
      </Card.Body>
    </Card>}
  </>
  );
};

export default CompanyComponent;
