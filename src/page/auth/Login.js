import React, { useState } from "react";
import "../../css/auth/Login.css";
import { Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Password } from "@mui/icons-material";

function Login(props) {
  //유저정보
  const [user, setUser] = useState({
    memberid: "",
    pswd: "",
  });

  const handleLogin = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
  };

  //로그인
  async function signIn() {
    const URL = "/hows/auth/login";
    axios
      .post(URL, JSON.stringify(user), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.dir("res", res);

        if (res.headers.authorization === undefined) {
          document.getElementById("failLogin").style.display = "block";
          document.getElementById("memberid").value = "";
          document.getElementById("pswd").value = "";
          setUser({ memberid: "", pswd: "" });
        } else {
          document.getElementById("failLogin").style.display = "none";

          //cookie로 저장
          const cookies = new Cookies();
          cookies.set("jwtToken", res.headers.authorization);
          window.location.href = "/hows";
        }
      })
      .catch((ex) => {
        console.log("login requset fail : " + ex);
        document.getElementById("failLogin").style.display = "block";
        document.getElementById("memberid").value = "";
        document.getElementById("pswd").value = "";
        setUser({ memberid: "", pswd: "" });
      });
  }

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
                  type="password"
                  placeholder="비밀번호"
                  onChange={handleLogin}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={2}></Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={6}>
              <button
                className="loginBtn"
                onClick={() => signIn()}
                disabled={user.memberid === "" && user.pswd === ""}
              >
                로그인
              </button>
            </Grid>
            <span id="failLogin">
              로그인 실패했어요. 아이디와 비밀번호를 확인해주세요.
            </span>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Login;
