
import {Routes, Route, Navigate} from "react-router-dom";
import { useState } from "react";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NavBar }from "./components/NavBar";
import './index.css';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/chatContext";


function App(){
  const {user} = useContext(AuthContext);
  
  return(
    <ChatContext.Provider user={user}>
    <NavBar/>
  <Container className="text-secondary">
  <Routes>

    <Route path="/" element={user ? <Chat />: <Login/>}/>
    <Route path="/register" element={user ? <Chat />: <Register/>}/>
    <Route path="/login" element={user ? <Chat/> : <Login/>} />
    <Route path="*" element={< Navigate to="/"/>}/>

  </Routes>
  </Container>
  </ChatContext.Provider>
  );
}

export default App;
