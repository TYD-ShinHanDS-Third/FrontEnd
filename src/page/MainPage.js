import React, { useState } from "react";
import "../css/MainPage.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import LoanList from "./loan/LoanList";
import HouseMap from "./pan/HouseMap";
import PanList from "./pan/PanList";
import MyPage from "./my/MyPage";
import LoanDetail from "./loan/LoanDetail";
import LoanLimit from "./loan/LoanLimit";
import LoanApply from "./loan/LoanApply";
import ManPage from "./admin/ManPage";
import MainMenu from "./MainMenu";
import AdminMenu from "./admin/AdminMenu";
import MyEdit from "./my/MyEdit";
import BankMenu from "./bank/BankMenu";
import BankMainPage from "./bank/BankMainPage";
import PanSubMenu from "./pan/PanSubMenu";
import AdminUserPage from "./admin/AdminUserPage";
import LoanSubMenu from "./loan/LoanSubMenu";
import NoAuth from "./NoAuth";

function menu(location) {
  if (location.pathname.includes("/hows/admin")) {
    return <AdminMenu />;
  } else if (location.pathname.includes("/hows/bank")) {
    return <BankMenu />;
  } else if (location.pathname.includes("/hows/noauth")) {
    return "";
  } else if (location.pathname.includes("/hows")) {
    return <MainMenu />;
  }
}

function logo(location) {
  if (location.pathname.includes("/hows/admin")) {
    return (
      <Link to="/hows/admin">
        <img className="logo" src="/image/LogoName.svg" alt="logo"></img>
      </Link>
    );
  } else if (location.pathname.includes("/hows/bank")) {
    return (
      <Link to="/hows/bank">
        <img className="logo" src="/image/LogoName.svg" alt="logo"></img>
      </Link>
    );
  } else if (location.pathname.includes("/hows")) {
    return (
      <Link to="/hows">
        <img className="logo" src="/image/LogoName.svg" alt="logo"></img>
      </Link>
    );
  }
}

function MainPage(props) {
  const location = useLocation();

  const [loc, setLocation] = useState("전체");
  const [bank, setBank] = useState("전체");

  const [userPageNum, setUserPageNum] = useState("0");
  const [userPageTotal, setUserListTotal] = useState("0");

  function findLocation(new_location) {
    setLocation(new_location.newloc);
  }

  function findBank(new_location) {
    setBank(new_location);
  }

  function submenu(location) {
    if (location.pathname.includes("/hows/notice")) {
      return <PanSubMenu findLocation={findLocation} />;
    } else if (location.pathname === "/hows/loan") {
      return <LoanSubMenu findBank={findBank} />;
    }
  }

  return (
    <div className="mainpage">
      <div className="header">
        <div>{logo(location)}</div>
        {menu(location)}
      </div>
      <div className="common">
        <div className="submenubar">{submenu(location)}</div>
      </div>
      <div className="content">
        <div className="img_con" id="img_con">
          <Routes>
            <Route path="notice/*" element={<PanList loc={loc} />}></Route>
            <Route path="find" element={<HouseMap />}></Route>
            <Route path="loan" element={<LoanList bank={bank} />}></Route>
            <Route path="loan/detail" element={<LoanDetail />}></Route>
            <Route path="loan/detail/limit/*" element={<LoanLimit />}></Route>
            <Route path="loan/detail/consult" element={<LoanApply />}></Route>
            <Route path="admin/*" element={<ManPage />}></Route>
            <Route path="my/mypage" element={<MyPage />}></Route>
            <Route path="my/myedit" element={<MyEdit />}></Route>
            <Route path="bank/*" element={<BankMainPage />}></Route>
            <Route path="noauth/*" element={<NoAuth />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
