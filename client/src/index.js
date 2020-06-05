
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
ReactDom.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById("root"));