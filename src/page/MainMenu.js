import React from "react";
import { Link } from "react-router-dom";

function MainMenu(props) {
  return (
    <div className="menubar">
      <Link
        to="/hows/notice"
        style={{ textDecoration: "none", color: "black" }}
      >
        <h3 className="menu">공고조회</h3>
      </Link>
      <Link to="/hows/find" style={{ textDecoration: "none", color: "black" }}>
        <h3 className="menu">주택확인</h3>
      </Link>
      <Link to="/hows/loan" style={{ textDecoration: "none", color: "black" }}>
        <h3 className="menu">대출확인</h3>
      </Link>
      <Link
        to="/hows/my/mypage"
        style={{ textDecoration: "none", color: "black" }}
      >
        <h3 className="menu">마이페이지</h3>
      </Link>
      <Link
        to="/hows/auth/login"
        style={{ textDecoration: "none", color: "black" }}
      >
        <button className="menu">로그인</button>
      </Link>
      <Link to="/hows/auth/signup">
        <button className="menu">회원가입</button>
      </Link>
    </div>
  );
}

export default MainMenu;
