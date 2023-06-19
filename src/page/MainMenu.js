import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function MainMenu(props) {
  const [token, setToken] = useState(undefined);
  const [myname, setMyname] = useState(undefined);

  const signout = (e) => {
    const cookies = new Cookies();
    cookies.remove("jwtToken");
    setToken(undefined);
    cookies.remove("myname");
    setMyname(undefined);
    window.location.href = "/hows";
  };

  useEffect(() => {
    const cookies = new Cookies();
    setToken(cookies.get("jwtToken"));
  }, []);

  return (
    <div className="menubar">
      <div className="menutab">
        <Link
          to="/hows/notice"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3 className="menu">공고조회</h3>
        </Link>
        <Link
          to="/hows/find"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3 className="menu">주택확인</h3>
        </Link>
        <Link
          to="/hows/loan"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h3 className="menu">대출확인</h3>
        </Link>
        <Link
          to="/hows/my/mypage"
          style={{
            textDecoration: "none",
            color: "black",
            display: token === undefined ? "none" : "block",
          }}
        >
          <h3 className="menu">마이페이지</h3>
        </Link>
      </div>

      <div className="menubtn">
        <Link
          to="/hows/auth/login"
          style={{
            textDecoration: "none",
            display: token === undefined ? "block" : "none",
          }}
        >
          <button className="menu">로그인</button>
        </Link>
        <Link
          to="/hows/auth/signup"
          style={{
            textDecoration: "none",
            display: token === undefined ? "block" : "none",
          }}
        >
          <button className="menu">회원가입</button>
        </Link>
        <div style={{ display: token === undefined ? "none" : "block" }}>
          <button className="menu" onClick={signout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
