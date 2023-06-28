import React, { useEffect, useState } from "react";
import "../../css/loan/LoanList.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import Modal from "./Modal";
import { confirmAlert } from "react-confirm-alert";

function LoanList({ bank }) {
  const [loanlist, setLoanList] = useState([]);

  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  const navigate = useNavigate();

  //상담하기 시작하기 전에 회원 등급 체크
  async function checkGrade(token, loan, bank) {
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
  }

  //목록 가져오기
  async function getList(bank) {
    const url = "/hows/loan";
    await axios
      .get(url, {
        params: {
          bankname: bank,
          page: 0,
          size: 100,
        },
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(function (response) {
        setLoanList(response.data.obj);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getList(bank.item == null ? "전체" : bank.item);
  }, [bank]);

  return (
    <div className="loanList">
      <div className="loanheader">
        <div className="pageTitle">
          <h2>전세자금 대출 상품</h2>
        </div>
      </div>

      <div className="loanbody">
        <hr className="loanhr" />
        <div className="scrollbody">
          {loanlist.map((pro) => {
            return (
              <div className="loan">
                <Link
                  to="/hows/loan/detail"
                  style={{ textDecoration: "none", color: "black" }}
                  state={{
                    bankname: pro.bankname,
                    loanname: pro.loanname,
                  }}
                >
                  <div className="loantitle">
                    <h2>
                      [{pro.bankname}] {pro.loanname}
                    </h2>
                  </div>
                  <div className="loandis">
                    <p>{pro.type}</p>
                  </div>
                </Link>
                <div className="loanbtn">
                  <div className="limitbtn">
                    <Modal
                      loanname={pro.loanname}
                      bankname={pro.bankname}
                      consult="0"
                    />
                  </div>
                  <button
                    className="consultbtn"
                    onClick={() =>
                      checkGrade(token, pro.loanname, pro.bankname)
                    }
                  >
                    상담신청
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LoanList;
