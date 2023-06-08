import React from "react";
import { Link } from "react-router-dom";

function BankMenu(props) {
  return (
    <div className="menubar">
      <Link
        to="/hows/bank/loanlist"
        style={{ textDecoration: "none", color: "white" }}
      >
        <h3 className="menu">대출신청 확인</h3>
      </Link>
    </div>
  );
}

export default BankMenu;
