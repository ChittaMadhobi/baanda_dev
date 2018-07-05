import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './entrance/components/layout/Navbar';
import Footer from './entrance/components/layout/Footer';
import Landing from './entrance/components/layout/Landing';
import Lobby from './entrance/components/layout/Lobby';

import Login from './entrance/components/auth/Login';
import Register from './entrance/components/auth/Register';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/lobby" component={Lobby} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
