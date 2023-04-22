import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import "./authentication.styles.scss";
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form copy/sign-in-form.component";

const Authentication = () => {
  const result = async () => {
    const response = await getRedirectResult(auth);
    console.log(response);
    if(response){
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }
  };

  useEffect(()=>{
    result();
  })


 
  const logGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log({ user });
  };

  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>Google popup</button>
      <button onClick={signInWithGoogleRedirect}>Google redirect</button> */}\
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
