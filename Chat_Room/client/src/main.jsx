import React  from "react";
import { ReactDOM } from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

    <App />
    </BrowserRouter>

  </React.StrictMode>
)
