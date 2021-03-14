import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ActivateScreen from "./screens/ActivateScreen";
import NewPasswordScreen from "./screens/NewPasswordScreen";
import NotFoundScreen from "./screens/NotFoundScreen"

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
            <Route path="/signup" component={RegisterScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/dashboard" component={DashboardScreen} />
            <Route path="/reset" component={ResetPasswordScreen}/>
            <Route path="/user/activate/:uid/:token" component={ActivateScreen}/>
            <Route path="/password/reset/confirm/:uid/:token" component={NewPasswordScreen}/>
            <Route path="/" component={Homescreen} exact />
            <Route path="*" component={NotFoundScreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
