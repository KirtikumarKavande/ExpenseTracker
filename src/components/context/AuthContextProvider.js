import React, { useState } from "react";
import AuthCtx from "./AuthContext";

const AuthContextProvider = (props) => {
  const [token, setToken] = useState("");
  const getTokenFunc = (token) => {
    setToken(token);
    localStorage.setItem('token',token)
  };

  const obj = {
    token: token,
    getTokenFunc: getTokenFunc,
  };

  return <AuthCtx.Provider value={obj}>{props.children}</AuthCtx.Provider>;
};

export default AuthContextProvider;
