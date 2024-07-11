import React, { useEffect } from "react";
import "./Header.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logoutFnc() {
    try {
      signOut(auth).then(() => {
        toast.success("User Signed out");
        navigate("/");
      });
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="navbar">
      <div class="logo-container">
        <div class="logo-icon">💰</div>
        <div class="logo-text">
          Penny<span>Wise</span>
        </div>
      </div>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            style={{ borderRadius: "50%", height: "2rem", width: "2rem" }}
          />
          <p onClick={logoutFnc} className="logo  logout-button">
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
