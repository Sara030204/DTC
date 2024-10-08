import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/bootstrap.min.css';
// import './assets/css/font-awesome.min.css';
import './assets/css/elegant-icons.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js';
import './assets/css/magnific-popup.css';
// import './assets/css/owl.carousel.min.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/fontawesome.min.css';
import './assets/css/style.css';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContext } from './Context';

const checkCustomer=localStorage.getItem('customer_login');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <UserContext.Provider value={checkCustomer}>
        <App />
        </UserContext.Provider>
    </Router>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
