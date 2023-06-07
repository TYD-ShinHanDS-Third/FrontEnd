import { border } from "@mui/system";
import React, { useEffect } from "react";
import "../../css/loan/LoanSuccess.css";

function goHome() {
  setTimeout("location.href='http://localhost:3000/hows'", 3000);
}

function LoanSuccess(props) {
  useEffect(() => {
    goHome();
    document.body.style.backgroundColor = "#f5f5f5";
  }, []);
  return (
    <div className="entire">
      <div className="circle"></div>
      <div className="front">
        <img className="logoSuccess" src="/image/Logo.svg" alt="hows" />
      </div>
      <div className="sucBox">
        <h3 className="sucMsg">
          대출이 신청 되었습니다. <br />
          서류 검토후 등록된 연락처로 결과 안내해 드리겠습니다. <br /> 3초 후
          메인 화면으로 이동합니다.
        </h3>
      </div>
    </div>
  );
}

export default LoanSuccess;
