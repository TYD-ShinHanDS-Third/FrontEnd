import React, { useEffect } from "react";
import "../../css/loan/LoanDetail.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import LoanDescription from "./LoanDescription";
import axios from "axios";
import { useState } from "react";

function LoanDetail(props) {
  const location = useLocation();

  const [title, setTitle] = useState("");
  const arr = [];

  useEffect(() => {
    setTitle(location.state.loanname);
  }, []);
  return (
    <div className="loandetail">
      <div className="loandetail_header">
        <div className="loandetail_title">
          <h2>{title}</h2>
        </div>

        <div className="loandetail_btn">
          <div className="detail_apply" id="detail_apply"></div>
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
