import React from "react";
import "../../css/loan/LoanLimit.css";
import { Link, Route, Routes } from "react-router-dom";
import LoanApply from "./LoanApply";
import LoanLimitDetail from "./LoanLimitDetail";
import LoanUploadDoc from "./LoanUploadDoc";

function LoanLimit(props) {
  return (
    <div className="loanlimit">
      <div className="loanlimit_header">
        <div className="loanlimit_title">
          <h2>버팀목 전세자금 대출</h2>
        </div>
      </div>

      <div className="loanlimit_body">
        <hr className="loanhr" />
        <Routes>
          <Route path="/" element={<LoanLimitDetail />}></Route>
          <Route path="uploaddocs" element={<LoanUploadDoc />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default LoanLimit;
