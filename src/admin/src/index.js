import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {BrowserRouter as Router} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';

ReactDOM.render(
    <Router>
        <App />
        <ToastContainer />
    </Router>,
    document.getElementById('root')
);