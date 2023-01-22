import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

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
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          name="display"
          placeholder="Email"
          onChange={handleChange}
          value={display}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Email"
          onChange={handleChange}
          value={password}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirm_password"
          placeholder="Email"
          onChange={handleChange}
          value={confirm_password}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
