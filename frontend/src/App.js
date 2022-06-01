import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/index";
import BusinessPage from "./components/BusinessPage";
import BusinessPageForm from './components/BusinessFormPage';
import BusinessPageEditForm from "./components/BusinessEditPage/index";
import ReviewsPage from "./components/ReviewsPage";
import ReviewForm from "./components/ReviewFormPage";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/businesses/:businessId'>
            <ReviewForm />
            <ReviewsPage />
            <BusinessPageEditForm />
          </Route>
          <Route exact path='/businesses'>
            <BusinessPageForm />
          </Route>
          <Route path="/">
            <BusinessPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
