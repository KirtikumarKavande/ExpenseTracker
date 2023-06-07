import React, { useState } from "react";
import AuthCtx from "./AuthContext";

const AuthContextProvider = (props) => {
  const localToken = localStorage.getItem("token");
  const img = localStorage.getItem("image");
  const localEmail=localStorage.getItem("email");
  const localName = localStorage.getItem("name");

  const [token, setToken] = useState(localToken);
  const [profileInfo, setProfileInfo] = useState({
    name: !!!localName ? "username" : localName,
    imgUrl: !!!img ? "img/Profile.png" : img,
    email:!!!localEmail?"example@example.com":localEmail
  });
  const getTokenFunc = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const getProfileInfo = (info) => {
    localStorage.setItem("image", info.imgUrl);
    localStorage.setItem('name',info.name)
    localStorage.setItem('email',info.email)

    setProfileInfo(info);
  };

  const obj = {
    token: token,
    getTokenFunc: getTokenFunc,
    profileInfo: profileInfo,
    getProfileInfo: getProfileInfo,
  };

  return <AuthCtx.Provider value={obj}>{props.children}</AuthCtx.Provider>;
};

export default AuthContextProvider;
