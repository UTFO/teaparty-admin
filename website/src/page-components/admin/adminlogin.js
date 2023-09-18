import { React, useRef, useState } from "react";
import "./adminlogin.css";
import club_logo_condensed from "./images/tealogo.png";
import passwordLogo from "./images/passwordLogo.png";
import { checkPasscode } from "../../api/passcode";

const AdminLogin = () => {
  const passwordInput = useRef(null);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let passcode = await checkPasscode(passwordInput.current.value)
    console.log(passcode)
    if (passcode.access) {
      // setTimeout(() => {
      //   window.location.href = "/admin/home"
      // }, 500)
      sessionStorage.setItem("accessToken", "true")
      sessionStorage.setItem("token", passcode.token)
      window.location.href = "/admin/dashboard";
    } else {
      setMessage("Incorrect Password, Try Again!");
      document.getElementsByClassName("passwordEntry")[0] && (document.getElementsByClassName("passwordEntry")[0].className = "passwordEntryWrong");
    }
  };
  const handleFocus = (e) => {
    e.target.className = "passwordEntry";
  };

  const returnHome = "> Back to Main Site";

  return (
    <div className="bottomBack">
      <div className="topBack">
        <div className="leftBack">
          <img src={club_logo_condensed} className="club_logo_condensed" />
          <div className="introText">
            We welcome you and <br />
            all of your tea needs.
          </div>
        </div>
        <form className="inputAreaContainer" onSubmit={handleSubmit}>
          <div className="inputAreaTitle">Admin Dashboard</div>
          <div className="passwordEntryContainer">
            <img src={passwordLogo} className="passwordLogo" />
            <input
              type="password"
              className="passwordEntry"
              placeholder="Enter Password"
              ref={passwordInput}
              onFocus={handleFocus}
            />
          </div>
          <input className="loginButton" type="submit" value="Login" />
          <div className="errorText">{message}</div>
          <div className="returnContainer">
            <a className="returnText" href="/">
              {returnHome}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
