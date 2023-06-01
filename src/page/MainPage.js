import React from "react";
import "../css/MainPage.css";
import { Routes, Route, Link } from "react-router-dom";

import LoanList from "./loan/LoanList";
import HouseMap from "./pan/HouseMap";
import PanList from "./pan/PanList";
import MyPage from "./my/MyPage";
import MyEdit from "./my/MyEdit";

function MainPage(props) {
  return (
    <div>
      <div className="header">
        <div>
          <img className="logo" src="image/Round_logo.svg" alt="logo"></img>
        </div>

        <div className="menubar">
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
      </div>
      <div className="content">
        <div className="img_con">
          <Routes>
            <Route path="notice/*" element={<PanList />}></Route>
            <Route path="find" element={<HouseMap />}></Route>
            <Route path="loan" element={<LoanList />}></Route>
            <Route path="my/mypage" element={<MyPage />}></Route>
            <Route path="my/myedit" element={<MyEdit />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
