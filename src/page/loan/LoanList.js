import React, { useEffect, useState } from "react";
import "../../css/loan/LoanList.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

function LoanList({ bank }) {
  const [loanlist, setLoanList] = useState([]);
  //신한, 국민: summary 우리: html1

  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

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
        console.dir("list", response.data);
        setLoanList(response.data.obj);
        // response.obj.map((loan) => {
        //   if (bank === "신한" || bank === "국민") {
        //     setLoanList([
        //       ...loan,
        //       { loanname: loan.loanname, summary: loan.type },
        //     ]);
        //   } else if (bank === "우리") {
        //     setLoanList([
        //       ...loan,
        //       { loanname: loan.loanname, summary: loan.type },
        //     ]);
        //   } else if (bank === "하나") {
        //     setLoanList([
        //       ...loan,
        //       { loanname: loan.loanname, summary: loan.type },
        //     ]);
        //   }
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(loanlist);
  }

  useEffect(() => {
    getList("전체");
  }, []);

  useEffect(() => {
    getList(bank.item);
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
        {loanlist.map((pro) => {
          return (
            <div className="loan">
              <Link
                to="/hows/loan/detail"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="loantitle">
                  <h2>{pro.loanname}</h2>
                </div>
                <div className="loandis">
                  <p>{pro.type}</p>
                </div>
              </Link>
              <div className="loanbtn">
                <Link
                  to="/hows/loan/detail/limit"
                  style={{ marginRight: "3%", width: "12%" }}
                  state={{
                    bankname: bank,
                    loanname: pro.loanname,
                  }}
                >
                  <button className="limitbtn">한도조회</button>
                </Link>
                <Link
                  to="/hows/loan/detail/consult"
                  style={{ width: "12%" }}
                  state={{
                    bankname: bank,
                    loanname: pro.loanname,
                    token: token,
                  }}
                >
                  <button className="consultbtn">상담신청</button>
                </Link>
              </div>
            </div>
          );
        })}

        <hr />
      </div>
    </div>
  );
}

export default LoanList;
