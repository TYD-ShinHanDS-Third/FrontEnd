import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../css/loan/LoanLimitDetail.css";
import { Cookies } from "react-cookie";

function LoanLimitDetail(props) {
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  const location = useLocation();
  return (
    <div>
      <p>
        [{location.state.bankname}]{location.state.loannme}
      </p>
      <h1>{token} 님의 대출 한도는 100만원 입니다.</h1>
      <Link to="/hows/loan/detail/consult">
        <button className="consultbtn" style={{ width: "50%" }}>
          상담신청
        </button>
      </Link>
    </div>
  );
}

export default LoanLimitDetail;
