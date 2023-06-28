import React, { useEffect } from "react";
import "../../css/loan/LoanDetail.css";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoanDescription from "./LoanDescription";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import { Cookies } from "react-cookie";
import { confirmAlert } from "react-confirm-alert";

function LoanDetail(props) {
  const location = useLocation();

  const loan = location.state.loanname;
  const bank = location.state.bankname;

  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  const navigate = useNavigate();

  //상담하기 시작하기 전에 회원 등급 체크
  const checkGrade = (token, loan, bank) => {
    const url = "/hows/auth/request";
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
          token: token,
        },
      })
      .then((res) => {
        if (res.data === "success") {
          navigate("/hows/loan/detail/consult", {
            state: {
              bankname: bank,
              loanname: loan,
              token: token,
            },
          });
        } else {
          confirmAlert({
            title: "마이페이지에서 회원 정보를 모두 입력해주세요.",
            message: "그 후에 상담 신청 가능합니다.",
            buttons: [
              {
                label: "확인",
                onClick: () => {},
                style: { backgroundColor: "#518e65" },
              },
            ],
          });
        }
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  };

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
            <div className="limitbtn">
              <Modal loanname={loan} bankname={bank} consult="0" />
            </div>
            <Link
              to="/hows/loan/detail/consult"
              style={{ width: "12%" }}
              state={{
                bankname: bank,
                loanname: loan,
                token: token,
              }}
            >
              <button
                className="consultbtn"
                onClick={() => checkGrade(token, loan, bank)}
              >
                상담신청
              </button>
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
