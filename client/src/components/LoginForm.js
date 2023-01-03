import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = ({ setRegistered }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { loading, error }] = useMutation(LOGIN);

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
      const { data } = await login({ variables: { ...formData } });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Login</h4>
      <input
        name="email"
        type="email"
        id="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        id="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
      />
      {error && <p>Invalid credentials</p>}
      {loading ? (
        <button>Submitting...</button>
      ) : (
        <button type="submit">Submit</button>
      )}
      <p>
        Not registered? Click{" "}
        <span onClick={() => setRegistered(false)}>here</span> to sign up.
      </p>
    </form>
  );
};

export default LoginForm;
