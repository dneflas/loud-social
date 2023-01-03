import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = ({ setRegistered }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [addUser, { loading }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({ variables: { ...formData } });
      Auth.login(data.addUser.token);
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong!");
    }

    setFormData({
      email: "",
      username: "",
      password: "",
    });
  };

  const { email, username, password } = formData;
  return (
    <form onSubmit={handleSubmit}>
      <h4>Sign Up</h4>
      <input
        name="email"
        type="email"
        id="email"
        placeholder="email"
        value={email}
        onChange={handleChange}
      />
      <input
        name="username"
        type="text"
        id="username"
        placeholder="username"
        value={username}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        id="password"
        placeholder="password"
        value={password}
        onChange={handleChange}
      />
      {errorMessage && <p>{errorMessage}</p>}
      {loading ? (
        <button>Submitting...</button>
      ) : (
        <button type="submit">Submit</button>
      )}
      <p>
        Already registered? Click{" "}
        <span onClick={() => setRegistered(true)}>here</span> to login.
      </p>
    </form>
  );
};

export default SignupForm;
