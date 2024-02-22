import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "@/components/chat";
import Login from "@/components/login";
import {  useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
function App() {
  const [cookies] = useCookies(['token']);
  const [user, setUser] = useState(null);
  const [secret, setSecret] = useState(null);
  const isAuth = Boolean(user) && Boolean(secret);

  useEffect(() => {
      try{
    const jwtPayload  = jwtDecode(cookies.token);
if(jwtPayload.is_authenticated){
setUser(jwtPayload.username);
setSecret(jwtPayload.password);
}}catch(e){
  // console.error(e);
}
  }, [])
  
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Navigate to="/chat" />
              ) : (
                <Login setUser={setUser} setSecret={setSecret} />
              )
            }
          />
          <Route
            path="/chat"
            element={
              isAuth ? (
                <Chat
                
                 user={user} secret={secret} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
