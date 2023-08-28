import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import './index.css';

import {BrowserRouter as Router} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';
import { StateProvider } from './context/StateProvider';
import reducer from './context/reducer';
import { initialState } from './context/initalState';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
// ReactDOM.render(
    <Router>
        <StateProvider reducer={reducer} initialState={initialState}>
            <App />
        </StateProvider>
        <ToastContainer />
    </Router>,
    // document.getElementById('root')
);