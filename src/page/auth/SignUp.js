import React, { useRef } from "react";
import "../../css/auth/SignUp.css";
import SignUpForm from "./SignUpForm";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
function SignUp(props) {
  return (
    <div className="entire">
      <div className="circle"></div>
      <div className="front">
        <img className="logoSignup" src="../../image/Logo.svg" alt="hows" />
        <Routes>
          <Route path="/signup" element={<SignUpForm />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default SignUp;
