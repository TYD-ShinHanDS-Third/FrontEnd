import React from "react";
import "../../css/loan/LoanApply.css";
import { Link } from "react-router-dom";
import Maincam from "./Maincam";

function LoanApply(props) {
  return (
    <div className="loanapply">
      <div className="loanapply_detail">
        <h1>여기 상품 설명</h1>
      </div>
      <div className="loanapply_chat">
        <Maincam />
      </div>

      <Link to="/hows/loan/detail/limit/uploaddocs">
        <button className="consultbtn">대출 자료 제출</button>
      </Link>
    </div>
  );
}

export default LoanApply;
