import React from "react";
import "../../css/auth/Login.css";
import { Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";

function Login(props) {
  return (
    <div>
      <img className="logoLogin" src="/image/Logo.svg" alt="hows" />
      <div className="loginBox">
        <div className="loginForm">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <div className="container-1">
                <i className="icon">
                  <PhotoCameraFrontOutlinedIcon />
                </i>
                <input id="memberId" name="memberId" placeholder="아이디" />
              </div>
              <div className="container-1">
                <i className="icon">
                  <LockOutlinedIcon />
                </i>
                <input id="pswd" name="pswd" placeholder="비밀번호" />
              </div>
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={6}>
              <button className="loginBtn">로그인</button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Login;
