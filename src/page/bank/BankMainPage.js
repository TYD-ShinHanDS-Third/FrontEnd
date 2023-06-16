import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import BankManageDocs from "./BankManageDocs";
import BankManageApplyLoan from "./BankManageApplyLoan";

function BankMainPage(props) {
  document.body.style.backgroundColor = "#eef1e6";

  return (
    <div>
      <Routes>
        <Route path="loanlist" element={<BankManageApplyLoan />}></Route>
        <Route path="loanlist/detail" element={<BankManageDocs />}></Route>
      </Routes>
    </div>
  );
}

export default BankMainPage;
