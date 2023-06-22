import React from "react";
import "../../src/css/MainPage.css";

function NoAuth(props) {
  return (
    <div className="noauth">
      <h1></h1>
      <h1>권한이 없습니다. 메인 페이지로 돌아갑니다.</h1>
      <div className="noauthImg">
        <img src="../../image/NoAuth.svg" style={{ height: "130%" }}></img>
      </div>
    </div>
  );
}

export default NoAuth;
