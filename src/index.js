import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import './index.css';
import './App.css';

import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import PhoneNumberValidation from "./components/PhoneNumberValidation";
import React from 'react';
import ReactDOM from "react-dom/client";
import ViewUsage from "./components/ViewUsage";
import reportWebVitals from './reportWebVitals';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PhoneNumberValidation />} />
          <Route path="ViewUsage" element={<ViewUsage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

