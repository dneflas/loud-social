import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Registration = () => {
  const [registered, setRegistered] = useState(true);

  return (
    <>
      {registered && <LoginForm setRegistered={setRegistered} />}
      {!registered && <SignupForm setRegistered={setRegistered} />}
    </>
  );
};

export default Registration;
