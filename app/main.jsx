import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './stores/index';
import RouteMap from './routers/routeMap';
import "../static/css/iconfont.css";
import 'nprogress/nprogress.css'
// import "antd/dist/antd";
import "./style.less";
// import './constants/interceptors';


const root = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <RouteMap />
  </Provider>,
  root
);
