import React, { Component } from "react";
import { Route,IndexRoute, hashHistory, Router } from "react-router";

import Serach from "../containers/Serach";
import Main from "../containers/Main";
import Login from "../containers/Login";
import Message from "../containers/Message";
import Detail from "../containers/Detail";
class RouteMap extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/">
          <IndexRoute component={Main} />
          <Route path="/serach/:page" component={Serach} />
          <Route path="/login" component={Login} />
          <Route path="/message(/:currentPage)" component={Message} />
          <Route path = "/detail/:page/:id" component={Detail} />
        </Route>
      </Router>
    );
  }
}

export default RouteMap;
