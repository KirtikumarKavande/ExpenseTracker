import React, { useRef } from "react";

const VerifyEmail = () => {
    const codeRef= useRef()
  const handleSubmit = (e) => {
 const oobCode   =codeRef.current.value
    e.preventDefault();
    const obj = {
oobCode
    };
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCklomBWJ4kYkGnD5vZ-1cR3ubCbQ1dp7Y",
      {
        method:'POST',
        headers:{"content-type": "application/json"},
        body:JSON.stringify(obj)
      }
    ).then((res)=>{
res.json().then((data)=>{
})
    })
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="Number"
        className="w-28 rounded-full border-blue-500 p-1"
        placeholder="security code"
ref={codeRef}
      />
      <button className="p-1 bg-green-400 rounded-lg ml-2">submit</button>
      <div>
        <button className="p-1 bg-red-500 rounded-md mt-1" type="submit">
          Resend code
        </button>
      </div>
    </form>
  );
};

export default VerifyEmail;
