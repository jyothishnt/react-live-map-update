import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import Home from './app/screens/Home';
import './assets/styles.css';

render((
  <Router>
    <Route path="/" component={Home}/>
  </Router>
), document.getElementById('container'));
