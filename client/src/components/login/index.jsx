
import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";
import {  useCookies } from 'react-cookie'
const Login = ({ setUser, setSecret }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [cookies, setCookie] = useCookies(['token']);
  const handleLogin = () => {
    triggerLogin({ username, password });
  };



  useEffect(() => {


  if (resultLogin.data?.response) {
    const token = resultLogin.data?.response.token;
    setCookie("token",token)
      setUser(username);
    setSecret(password);
  }

   
  }, [resultLogin.data]); // eslint-disable-line

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">CHATGPT APP</h2>


        <div>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          {(
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
