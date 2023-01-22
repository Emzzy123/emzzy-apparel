import { useState } from "react";

import FormInput from "../input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  display: "",
  email: "",
  password: "",
  confirm_password: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { display, email, password, confirm_password } = formFields;

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirm_password) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { display });
      resetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="display"
          onChange={handleChange}
          value={display}
          required
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirm_password"
          onChange={handleChange}
          value={confirm_password}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
