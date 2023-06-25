import React, { useContext, useEffect, useState } from "react";
import Form from "./Form";
import AuthCtx from "../../context/AuthContext";
import { SuccessAlert } from "../../../Utlities/constant";
import VerifyEmail from "./VerifyEmail";

const Profile = () => {
  const [issuccess, setIsSuccess] = useState(false);
  const [isshow, setIsShow] = useState(false);
  const ctxData = useContext(AuthCtx);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;


  const verifyEmailFunc = async () => {
    setIsSuccess(true);
    setIsShow(true);

    const data = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCklomBWJ4kYkGnD5vZ-1cR3ubCbQ1dp7Y",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: ctxData.token,
        }),
      }
    );
    const json = await data.json();
  };

  useEffect(() => {
    if (ctxData.token) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCklomBWJ4kYkGnD5vZ-1cR3ubCbQ1dp7Y",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            idToken: ctxData.token,
          }),
        }
      ).then((res) => {
        res.json().then((payload) => {
          console.log('payload',payload)

          const newObj = {
            name: payload?.users[0]?.displayName,
            imgUrl: payload?.users[0]?.photoUrl,
            email: payload?.users[0]?.email,
            verifiedEmail: payload?.users[0]?.emailVerified,
          };

          ctxData.getProfileInfo(newObj);
        });
      });
    }
  }, []);


  useEffect(() => {
    const id = setInterval(() => {
      setIsSuccess(false);
    }, [2000]);
    return () => {
      clearTimeout(id);
    };
  }, [issuccess]);
  return (
    <div className="relative">
      {issuccess && (
        <SuccessAlert
          title={"Verify Email"}
          messege={"Verification mail Sent Successfully"}
        />
      )}

      <div className="max-w-sm w-full md:max-w-full lg:flex m-auto  top-0 left-0 z-10  ">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          title="Woman holding a mug"
        >
          <img
            className="h-[17rem] w-[12.5rem] md: m-auto"
            src={ctxData?.profileInfo?.imgUrl} alt="profile"
          />
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center justify-center">
              <svg
                className="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Members only
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2 text-center">
              Welcome Expense Tracker developed by kk developers(kirtikumar
              Kavande)
            </div>
            <div className="text-blue-500">
              Email:{ctxData?.profileInfo?.email}
            </div>
            <div>
              {ctxData?.profileInfo?.verifiedEmail ? (
                <div>
                  <span>Email is Verified </span>
                  <img
                    className="w-6 h-6 inline-block"
                    src="img/verified.png"
                    alt="verified"
                  />
                </div>
              ) : (
                <>
                  <span>Email is Not verified</span>
                  <img
                    className="w-6 h-6 inline-block"
                    src="img/not_Verified.png"
                    alt="not verified"
                  />
                </>
              )}
            </div>
            {/* {isshow && <VerifyEmail />} */}
            {!ctxData.profileInfo.verifiedEmail && (
              <p className="text-red-700 text-center">
                Please Update the Profile to change the status to Verified after
                Email Verification
              </p>
            )}

            {!isshow && !ctxData.profileInfo.verifiedEmail && (
              <button
                className="p-1 bg-blue-500 rounded-md mx-32 md:mx-0 lg:mx-56 "
                onClick={verifyEmailFunc}
              >
                verify Email
              </button>
            )}
          </div>
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="img/Profile.png"
              alt="Avatar of Jonathan Reinink"
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">
                {ctxData?.profileInfo?.name}
              </p>
              <p className="text-gray-600">{currentDate}</p>
            </div>
          </div>
        </div>

        <Form />
      </div>
    </div>
  );
};

export default Profile;
