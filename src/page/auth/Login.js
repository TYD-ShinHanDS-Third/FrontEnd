import React, { useState } from "react";
import "../../css/auth/Login.css";
import { Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";
import axios from "axios";

function Login(props) {
  const [userInfo, setState] = useState({
    memberid: "ckdrua1",
    pswd: "1234",
  });

  const handleLogin = (e) => {
    setState({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignin = (e) => {
    const URL = "/member/login";
    axios
      .post(URL, JSON.stringify(userInfo), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log("res.data.accessToken : " + res.headers.authorization);
        //axios.defaults.headers.common["Authorization"] = "Bearer " + res.data;
        //props.loginCallBack(true);
        alert("complete");
        console.log(res.data);
        localStorage.setItem("jwtToken", res.headers.authorization);
        //setAuthToken(res.headers.authorization);
        // props.history.push({
        //   pathname: "/chooselantern",
        // });
      })
      .catch((ex) => {
        console.log("login requset fail : " + ex);
      })
      .finally(() => {
        console.log("login request end");
      });

    setState({
      memberid: "",
      pswd: "",
    });
  };
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
                <input
                  id="memberid"
                  name="memberid"
                  placeholder="아이디"
                  onChange={handleLogin}
                />
              </div>
              <div className="container-1">
                <i className="icon">
                  <LockOutlinedIcon />
                </i>
                <input
                  id="pswd"
                  name="pswd"
                  placeholder="비밀번호"
                  onChange={handleLogin}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={6}>
              <button className="loginBtn" onClick={handleSignin}>
                로그인
              </button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Login;
