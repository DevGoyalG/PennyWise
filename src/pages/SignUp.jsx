import React from "react";
import Header from "../components/Header/Header";
import "../App.css";
import SignUpSignin from "../components/SignupSignin/SignUpSignin";
function SignUp() {
  return (
    <div>
      <Header></Header>
      <div className="wrapper1">
        <SignUpSignin />
      </div>
    </div>
  );
}

export default SignUp;
