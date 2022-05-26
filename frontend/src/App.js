import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './component/LoginFormPage/index';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
