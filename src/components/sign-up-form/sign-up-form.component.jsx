import {useState } from "react";
import "./sign-up-form.styles.scss";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInputValue from "../form-input/form-input.component";
import Button from "../button/button.component";
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("The passwords dont match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields()
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create, user already registered");
      } else {
        console.log("There was an error", error);
      }
    }
  };

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  
  return (
    <div className="sign-up-container">
        <h2>Don't have a password</h2>
      <span>sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInputValue
          label='display Name'
          type="text"
          required
          onChange={onHandleChange}
          name="displayName"
          value={displayName}
        />
        <FormInputValue
          label='email'
          type="email"
          required
          onChange={onHandleChange}
          name="email"
          value={email}
        />
        <FormInputValue
          label='password'
          type="password"
          required
          onChange={onHandleChange}
          name="password"
          value={password}
        />
        <FormInputValue
          label='confirm password'
          type="password"
          required
          onChange={onHandleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
        
        
      </form>
    </div>
  );
};

export default SignUpForm;
