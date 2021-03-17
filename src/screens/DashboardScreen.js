import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";
import { Form, Row, Col, Tabs, Tab } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { listCompanies, listFavorites,
} from "../actions/companyAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails } from "../actions/userActions";
import CompanyComponent from "../components/CompanyComponent";



const DashboardScreen = ({ history, location }) => {

  const dispatch = useDispatch();
  const onClick = () => dispatch(listFavorites());
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const addFav = useSelector((state) => state.addFav);
  const {
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
    error: errorDel,
    message: messageDel,
  } = deleteFav;
 
  useEffect(() => {
    
    window.scrollTo(0, 0);
    dispatch(listCompanies());
    dispatch(listFavorites());

    dispatch(getUserDetails()); //testing

    if (!userInfo) {
      history.push("/login");
    }
  }, [
    history,
    userInfo,
    dispatch,
    messageDel,
  ]);

  const [searchData, setSearchData] = useState(allCompanies);
  const [query, updateQuery] = useState('');
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
              onChange={(e) => {updateQuery(e.target.value); searchItem(e.target.value)}}
              placeholder="Search Companies"></Form.Control>
      <Col md={12}>
        <div className="py-3">
           {messageAdd && toast.info(messageAdd)}
           {errorAdd && toast.error(errorAdd)}
           {messageDel && toast.info(messageDel)}
           {errorDel && toast.error(errorDel)}
           <ToastContainer autoClose={2000} hideProgressBar={true} newestOnTop={true} closeOnClick
                          rtl={false} pauseOnFocusLoss pauseOnHover/>
          <Tabs fill onSelect={onClick} defaultActiveKey="companies" id="uncontrolled-tab-example">
            <Tab
              eventKey="companies"
              title={`Companies`}
            >
              <Row className="py-3">
                { loadingCom ? (
                  <Loader />
                ) : errorCom ? (
                  <Message variant="danger">{errorCom}</Message>
                ) : allCompanies.length > 0 ? (
                 query ? (searchData.map((companies) => (                    
                    <>
                      <Col md={6}>
                        <CompanyComponent companies={companies} />
                      </Col>                     
                    </> 
                  ))) : allCompanies.map((companies) => (
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
              eventKey="favorites"
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
    // </>
  );
};

export default DashboardScreen;
