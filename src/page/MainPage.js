import React from "react";
import "../css/MainPage.css";

function MainPage(props) {
  return (
    <div>
      <div className="header">
        <div>
          <img className="logo" src="image/Logo.svg"></img>
        </div>
        <div className="menubar">
          <h3 className="menu">공고조회</h3>
          <h3 className="menu">주택확인</h3>
          <h3 className="menu">대출확인</h3>
          <h3 className="menu">마이페이지</h3>
          <button className="menu">로그인</button>
          <button className="menu">회원가입</button>
        </div>
      </div>
      <div className="content">
        <div className="img_con"></div>
      </div>
    </div>
  );
}

export default MainPage;
