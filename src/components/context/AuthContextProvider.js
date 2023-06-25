import React, { useState } from "react";
import AuthCtx from "./AuthContext";

const AuthContextProvider = (props) => {
  const localToken = localStorage.getItem("token");
  const img = localStorage.getItem("image");
  const localEmail = localStorage.getItem("email");
  const localName = localStorage.getItem("name");
  const isVerifiedEmail = localStorage.getItem("verifiedEmail");

  const [token, setToken] = useState(localToken);
  const[email,setEmail]=useState('')
  const [profileInfo, setProfileInfo] = useState({
    // name:  "username",
    // imgUrl: "img/Profile.png" ,
    // email:"example@example.com",
    // verifiedEmail:false
  });
  const getTokenFunc = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const getProfileInfo = (info) => {
    // localStorage.setItem("image", info.imgUrl);
    // localStorage.setItem('name',info.name)
    // localStorage.setItem('email',info.email)
    // localStorage.setItem('verifiedEmail',info.verifiedEmail)

    setProfileInfo(info);
  };
  console.log("profileInfo", profileInfo);
const getEmailFunc=(item)=>{
  setEmail(item)
}
  const obj = {
    token: token,

    getTokenFunc: getTokenFunc,
    getEmailFunc:getEmailFunc,
    email:email,

    profileInfo: profileInfo,
    getProfileInfo: getProfileInfo,
  };

  return <AuthCtx.Provider value={obj}>{props.children}</AuthCtx.Provider>;
};

export default AuthContextProvider;
