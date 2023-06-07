import React from "react";
import "../../css/admin/Consulting.css";

function Consulting(props) {
  return (
    <div className="managedocs">
      <div className="managedocs_header">
        <div className="managedocs_title">
          <h2>버팀목 전세자금 대출 - 회원 이름</h2>
        </div>
      </div>

      <div className="managedocs_body">
        <hr className="loanhr" />
        <div className="consulting">
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
                  textAlign: "left"
                }}
              />
              <button className="send">전송</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consulting;
