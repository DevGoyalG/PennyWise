import React, { useState } from "react";
import "./SignupSignin.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "../../firebase.js";
import { GoogleOutlined } from "@ant-design/icons";

function SignUpSignin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  const navigate = useNavigate();

  function signupUsingEmail() {
    setLoading(true);
    if (name !== "" && email !== "" && password !== "" && confirmPass !== "") {
      if (password === confirmPass) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast.success("User created!");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
            setLoading(false);
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
        setPassword("");
        setConfirmPass("");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    console.log(email);
    console.log(password);
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged in");
          setLoading(false);
          console.log(user);
          // createDoc(user);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Doc already exists");
    }
  }

  function siginUsingGoogle() {
    setLoading(true);

    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          createDoc(user);
          navigate("/dashboard");
          toast.success("User Logged in");
          setLoading(false);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          toast.error(errorMessage);
        });
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "var(--theme)" }}>PennyWise</span>
          </h2>
          <form>
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"teddbundy10psyco@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Password"}
            />
            <Button
              text={loading ? "Loading" : "Login Using Email and Password"}
              onClick={loginUsingEmail}
              disabled={loading}
            />
            <p style={{ textAlign: "center" }}>or</p>
            <Button
              text={loading ? "Loading" : `Login Using Google`}
              blue={true}
              disabled={loading}
              onClick={siginUsingGoogle}
            />
            <p style={{ textAlign: "center", fontSize: "0.8rem" }}>
              or Don't have an Account?{" "}
              <span
                style={{
                  color: "var(--theme)",
                  display: "inline",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={() => setLoginForm(false)}
              >
                Click here
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            SignUp on <span style={{ color: "var(--theme)" }}>PennyWise</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Tedd Bundy"}
            />
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"teddbundy10psyco@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Password"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPass}
              setState={setConfirmPass}
              placeholder={"Confirm Password"}
            />
            <Button
              text={loading ? "Loading" : "SignUp Using Email and Password"}
              onClick={signupUsingEmail}
              disabled={loading}
            />
            <p style={{ textAlign: "center" }}>or</p>
            <Button
              onClick={siginUsingGoogle}
              text={loading ? "Loading" : "SignUp Using Google"}
              blue={true}
              disabled={loading}
            />
            <p style={{ textAlign: "center", fontSize: "0.8rem" }}>
              or Don't have an Account?{" "}
              <span
                style={{
                  color: "var(--theme)",
                  display: "inline",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={() => setLoginForm(true)}
              >
                Click here
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignUpSignin;
