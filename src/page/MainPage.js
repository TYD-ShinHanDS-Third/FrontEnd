import React from "react";
import "../css/MainPage.css";
import { Routes, Route, Link } from "react-router-dom";

import LoanList from "./loan/LoanList";
import HouseMap from "./pan/HouseMap";
import PanList from "./pan/PanList";
import MyPage from "./my/MyPage";
import LoanDetail from "./loan/LoanDetail";
import LoanLimit from "./loan/LoanLimit";
import LoanApply from "./loan/LoanApply";
import LoanUploadDoc from "./loan/LoanUploadDoc";

function MainPage(props) {
  return (
    <div>
      <div className="header">
        <div>
          <Link to="/hows">
            <img className="logo" src="/image/Round_logo.svg" alt="logo"></img>
          </Link>
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
            to="/hows/mypage"
            style={{ textDecoration: "none", color: "black" }}
          >
            <h3 className="menu">마이페이지</h3>
          </Link>
          <Link
            to="/hows/find"
            style={{ textDecoration: "none", color: "black" }}
          >
            <button className="menu">로그인</button>
          </Link>
          <Link to="/hows/signup">
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
            <Route path="loan/detail" element={<LoanDetail />}></Route>
            <Route path="loan/detail/limit/*" element={<LoanLimit />}></Route>
            <Route path="loan/detail/consult" element={<LoanApply />}></Route>
            <Route path="mypage" element={<MyPage />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
