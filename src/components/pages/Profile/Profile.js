import React, { useContext } from "react";
import Form from "./Form";
import AuthCtx from "../../context/AuthContext";

const Profile = () => {
  const ctxData = useContext(AuthCtx);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  return (
    <div className="max-w-sm w-full md:max-w-full lg:flex m-auto">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        title="Woman holding a mug"
      >
        <img
          className="h-[14rem] w-[9.5rem] md: m-auto"
          src={ctxData?.profileInfo?.imgUrl}
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
          <div className="text-blue-500">Email:{ctxData?.profileInfo?.email}</div>
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
  );
};

export default Profile;
