import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import IndexPage from './pages/index';
import LoginPage from './pages/login';

const Routings = (
  <Router>
    <Route path="/" component={IndexPage} />

    <Route path="/login" component={LoginPage} />
  </Router>
);

export default Routings;