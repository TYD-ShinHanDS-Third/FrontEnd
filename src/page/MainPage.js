import React from "react";
import "../css/MainPage.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import LoanList from "./loan/LoanList";
import HouseMap from "./pan/HouseMap";
import PanList from "./pan/PanList";
import MyPage from "./my/MyPage";
import LoanDetail from "./loan/LoanDetail";
import LoanLimit from "./loan/LoanLimit";
import LoanApply from "./loan/LoanApply";
import LoanUploadDoc from "./loan/LoanUploadDoc";
import ManPage from "./admin/ManPage";
import MainMenu from "./MainMenu";
import AdminMenu from "./admin/AdminMenu";

function menu(location) {
  if (location.pathname.includes("/hows/admin")) {
    return <AdminMenu />;
  } else if (location.pathname.includes("/hows")) {
    return <MainMenu />;
  }
}

// link 만 가변적으로 두면 될거같은! 더 좋은 생각이 있을 듯 함!
function logo(location) {
  if (location.pathname.includes("/hows/admin")) {
    return (
      <Link to="/hows/admin">
        <img className="logo" src="/image/Round_logo.svg" alt="logo"></img>
      </Link>
    );
  } else if (location.pathname.includes("/hows")) {
    return (
      <Link to="/hows">
        <img className="logo" src="/image/Round_logo.svg" alt="logo"></img>
      </Link>
    );
  }
}

function MainPage(props) {
  const location = useLocation();

  return (
    <div className="mainpage">
      <div className="header">
        <div>{logo(location)}</div>
        {menu(location)}
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
            <Route path="admin/*" element={<ManPage />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
