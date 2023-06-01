import React from "react";
import "../../css/loan/LoanDetail.css";
import { Link, Route, Routes } from "react-router-dom";
import LoanDescription from "./LoanDescription";

function LoanDetail(props) {
  return (
    <div className="loandetail">
      <div className="loandetail_header">
        <div className="loandetail_title">
          <h2>버팀목 전세자금 대출</h2>
        </div>

        <div className="loandetail_btn">
          <div className="detail_apply">
            {/* <Link to="/hows/loan/detail/limit/consult" style={{}}>
              <button className="detail_applybtn">신청하기</button>
            </Link> */}
          </div>
          <Link to="/hows/loan/detail/limit" style={{}}>
            <button className="detail_limitbtn">한도조회</button>
          </Link>
          <Link to="/hows/loan/detail/consult" style={{}}>
            <button className="detail_consultbtn">상담신청</button>
          </Link>
        </div>
      </div>
      <div className="loandetail_body">
        <hr className="loanhr" />
        <Routes>
          <Route path="/" element={<LoanDescription />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default LoanDetail;
