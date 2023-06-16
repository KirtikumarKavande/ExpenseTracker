import React, { useContext, useEffect, useRef } from "react";
import AuthCtx from "../../context/AuthContext";

const Form = () => {
  const ctxdata = useContext(AuthCtx);
  const nameRef = useRef();
  const photo = useRef();

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCklomBWJ4kYkGnD5vZ-1cR3ubCbQ1dp7Y",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          idToken: ctxdata.token,
        }),
      }
    ).then((res) => {
      res.json().then((payload) => {
        const newObj = {
          name: payload?.users[0]?.displayName,
          imgUrl: payload?.users[0]?.photoUrl,
          email: payload?.users[0]?.email,
          verifiedEmail: payload?.users[0]?.emailVerified,
        };

        ctxdata.getProfileInfo(newObj);
      });
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = nameRef.current.value;
    const photoUrl = photo.current.value;

    const obj = {
      displayName,
      photoUrl,
    };
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCklomBWJ4kYkGnD5vZ-1cR3ubCbQ1dp7Y",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...obj,
          idToken: ctxdata.token,
          returnSecureToken: true,
        }),
      }
    ).then((res) => {
      res.json().then((data) => {
        const obj = {
          name: data?.providerUserInfo[0].displayName,
          imgUrl: data?.providerUserInfo[0].photoUrl,
          verifiedEmail: data?.providerUserInfo[0].photoUrl.emailVerified,
        };
        ctxdata?.getProfileInfo(obj);
      });
    });
  };
  return (
    <form
      className="w-[70vw] mt-3 m-auto md:w-[70vw] lg:w-[20vw]"
      onSubmit={handleSubmit}
    >
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-full-name"
          >
            Full Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="inline-full-name"
            type="text"
            ref={nameRef}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            for="inline-password"
          >
            Profile Photo Link
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            id="inline-password"
            type="text"
            placeholder="url"
            ref={photo}
            required
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded flex justify-center"
            type="submit"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
