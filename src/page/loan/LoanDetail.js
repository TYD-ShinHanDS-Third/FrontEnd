import React, { useEffect } from "react";
import "../../css/loan/LoanDetail.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import LoanDescription from "./LoanDescription";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import { Cookies } from "react-cookie";

function LoanDetail(props) {
  const location = useLocation();

  const loan = location.state.loanname;
  const bank = location.state.bankname;

  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  // const [title, setTitle] = useState("");
  // const arr = [];

  // useEffect(() => {
  //   setTitle("["+location.state.banklocation.state.loanname);
  // }, []);
  return (
    <div className="loandetail">
      <div className="loandetail_header">
        <div className="loandetail_title">
          <h2>
            [{bank}] {loan}
          </h2>
        </div>

        <div className="loandetail_btn">
          <div className="detail_apply" id="detail_apply"></div>
          <div className="loanbtn">
            <Modal loanname={loan} bankname={bank} consult="0" />
            <Link
              to="/hows/loan/detail/consult"
              style={{ width: "12%" }}
              state={{
                bankname: bank,
                loanname: loan,
                token: token,
              }}
            >
              <button className="consultbtn">상담신청</button>
            </Link>
          </div>
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
