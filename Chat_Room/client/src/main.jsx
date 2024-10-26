import React  from "react";
import ReactDOM  from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>

  <AuthContextProvider>
  <App />
  </AuthContextProvider>
    </BrowserRouter>
    </React.StrictMode>
);
