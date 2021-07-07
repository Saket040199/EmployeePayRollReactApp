import React from 'react';
import './App.css';
import PayrollForm from './components/payroll-form/payroll-form';
import Header from './components/headerpart/header';
import HomePage from './components/home-page/home-page';

import {
  BrowserRouter as Router,Switch,Route, Redirect } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/payroll-form">
            <PayrollForm />
          </Route>
            <Route exact path="/payroll-form/:id">
              <PayrollForm />
            
          </Route>
          <Route exact path="">
            <Redirect exact from="/" to="/home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
