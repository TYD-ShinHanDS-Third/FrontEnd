import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import BankManageDocs from "./BankManageDocs";
import BankManageApplyLoan from "./BankManageApplyLoan";
import axios from "axios";
import { Cookies } from "react-cookie";
import BankImgCom from "./BankImgCom";

function BankMainPage(props) {
  document.body.style.backgroundColor = "#eef1e6";

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    const url = "/hows/bank/check";
    const requestUrl = "/hows/bank";
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
          token: token,
        },
        params: {
          url: requestUrl,
        },
      })
      .then((res) => {})
      .catch((ex) => {
        console.log("requset fail : " + ex);
        if (ex.response.status === 403) {
          window.location.href = "/hows/noauth";
        }
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<BankImgCom />}></Route>
        <Route path="loanlist" element={<BankManageApplyLoan />}></Route>
        <Route path="loanlist/detail" element={<BankManageDocs />}></Route>
      </Routes>
    </div>
  );
}

export default BankMainPage;
