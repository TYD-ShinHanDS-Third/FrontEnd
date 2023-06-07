import React from "react";
import "../../css/loan/LoanApply.css";
import { Link } from "react-router-dom";

function LoanApply(props) {
  return (
    <div className="loanapply">
      <div className="loanapply_detail">
        <h1>여기 상품 설명</h1>
      </div>
      <div className="loanapply_chat">
        <div className="chat_context">
          <div className="you">
            <h3>상담을 시작합니다.</h3>
            <h3>상담을 시작.</h3>
          </div>
          <div className="me">
            <h3>안녕하세요!!</h3>
            <h3>!!sdhfjshk</h3>
            <h3>!!sdffsd</h3>
          </div>
        </div>

        <hr style={{ marginBottom: "0" }} />
        <div className="chat_input">
          <textarea
            className="input_context"
            style={{
              width: "100%",
              height: "90%",
              textAlign: "left",
            }}
          />
          <button className="send">전송</button>
        </div>
      </div>

      <Link to="/hows/loan/detail/limit/uploaddocs">
        <button className="consultbtn">대출 자료 제출</button>
      </Link>
    </div>
  );
}

export default LoanApply;
