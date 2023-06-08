import React from "react";
import { Link } from "react-router-dom";
import "../../css/loan/LoanLimitDetail.css";

function LoanLimitDetail(props) {
  return (
    <div>
      <p>detail page 한도조회 페이지</p>

      <Link to="/hows/loan/detail/consult">
        <button className="consultbtn" style={{ width: "50%" }}>
          상담신청
        </button>
      </Link>
    </div>
  );
}

export default LoanLimitDetail;
