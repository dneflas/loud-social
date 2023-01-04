import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Header from "../components/Header";

const Registration = () => {
  const [registered, setRegistered] = useState(true);

  return (
    <>
      <Header />
      {registered && <LoginForm setRegistered={setRegistered} />}
      {!registered && <SignupForm setRegistered={setRegistered} />}
    </>
  );
};

export default Registration;
