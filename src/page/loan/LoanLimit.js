import React from "react";
import "../../css/loan/LoanLimit.css";
import { Route, Routes, useLocation } from "react-router-dom";
import LoanLimitDetail from "./LoanLimitDetail";
import LoanUploadDoc from "./LoanUploadDoc";
import LoadingPage from "./LoadingPage";

function LoanLimit(props) {
  const location = useLocation();
  console.log(location.state.bankname);

  return (
    <div className="loanlimit">
      <div className="loanlimit_header">
        <h2>
          [{location.state.bankname}] {location.state.loanname}
        </h2>
      </div>

      <div className="loanlimit_body">
        <hr className="loanhr" />
        <Routes>
          <Route path="/" element={<LoanLimitDetail />}></Route>
          <Route path="loading" element={<LoadingPage />}></Route>
          <Route path="uploaddocs" element={<LoanUploadDoc />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default LoanLimit;
