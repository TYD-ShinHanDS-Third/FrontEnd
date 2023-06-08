import React, { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import BankManageDocs from "./BankManageDocs";
import BankManageApplyLoan from "./BankManageApplyLoan";

function BankMainPage(props) {
  document.body.style.backgroundColor = "#477CAD";
  useEffect(() => {
    const tile = document.getElementById("img_con");
    tile.style.border = "solid 3px #477CAD";
  }, []);

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
