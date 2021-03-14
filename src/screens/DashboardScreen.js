import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";
import { Form, Row, Col, Tabs, Tab } from "react-bootstrap";

import {
  listCompanies,
  listFavorites,
} from "../actions/companyAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails } from "../actions/userActions";
import CompanyComponent from "../components/CompanyComponent";



const DashboardScreen = ({ history, location }) => {

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addFav = useSelector((state) => state.addFav);
  const {
    loading: loadingAdd,
    error: errorAdd,
    message: messageAdd,
  } = addFav;

  const listFav = useSelector((state) => state.listFav);
  const {
    loading: loadingFav,
    error: errorFav,
    allFavorites,
  } = listFav;

  const listCom = useSelector((state) => state.listCom);
  const {
    loading: loadingCom,
    error: errorCom,
    allCompanies,
  } = listCom;


  const deleteFav = useSelector((state) => state.deleteFav);
  const {
    loading: loadingDel,
    error: errorDel,
    message: messageDel,
  } = deleteFav;
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    
    window.scrollTo(0, 0);
    dispatch(listCompanies());
    dispatch(listFavorites());

    dispatch(getUserDetails()); //testing

    if (!userInfo) {
      history.push("/login");
    }
    if(!messageDel){
      setVisible(false)
      return
     }
     // error exists. Display the message and hide after 5 secs
     setVisible(true)
     const timer = setTimeout(() => {
       setVisible(false)
     }, 5000);
     return () => clearTimeout(timer);

  }, [
    history,
    userInfo,
    dispatch,
    messageDel,
  ]);

  const [searchData, setSearchData] = useState(allCompanies);
  const searchItem = (query) => {
    const fuse = new Fuse(allCompanies, {
      shouldSort: true,
      threshold: 0.1,
      location: 0,
      distance: 100,
      keys: ["name",]
    });
    const result = fuse.search(query);
    const finalResult = [];
    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      setSearchData(finalResult);
    } else {
      setSearchData(allCompanies);
    }
  };
  return (
    <Row>
      <Form.Label>Search Companies</Form.Label>
              <Form.Control
              type="search"
              onChange={(e) => searchItem(e.target.value)}
              placeholder="Search Companies"></Form.Control>
      <Col md={12}>
        <div className="py-3">
         {errorAdd && <Message variant="danger">{errorAdd}</Message>}
          {loadingAdd && <Loader />}
          {messageAdd && <Message variant="success">{messageAdd}</Message>}
          {errorDel && <Message variant="danger">{errorDel}</Message>}
          {loadingDel && <Loader />}
          {messageDel && <Message variant="success">{messageDel}</Message>}
          <Tabs fill defaultActiveKey="pending" id="uncontrolled-tab-example">
            <Tab
              eventKey="pending"
              title={`Companies`}
            >
              <Row className="py-3">
                { loadingCom ? (
                  <Loader />
                ) : errorCom ? (
                  <Message variant="danger">{errorCom}</Message>
                ) : allCompanies.length > 0 ? (
                  searchData.map((companies) => (
                    <>
                      <Col md={6}>
                        <CompanyComponent companies={companies} />
                      </Col>
                    </>
                  ))
                ) : (
                  <Col>
                    <Message variant="info">No companies</Message>
                  </Col>
                )}
              </Row>
            </Tab>
            <Tab
              eventKey="rejected"
              title={`Favorites`}
            >
              <Row className="py-3">
                {loadingFav ? (
                  <Loader />
                ) : errorFav ? (
                  <Message variant="danger">{errorFav}</Message>
                ) : allFavorites.length > 0 ? (
                  allFavorites.map((favorites) => (
                    <>
                      <Col md={6}>
                        <CompanyComponent favorites={favorites} />
                      </Col>
                    </>
                  ))
                ) : (
                  <Col>
                    <Message variant="info">Favorites is Empty</Message>
                  </Col>
                )}
              </Row>
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};

export default DashboardScreen;
