import React from "react";
import "../../css/admin/ManageDocs.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import LoanDescription from "../loan/LoanDescription";

function ManageDocs(props) {
  const location = useLocation();
  console.log(location.state);
  const membername = location.state.membername;
  const loanname = location.state.loanname;
  return (
    <div className="managedocs">
      <div className="managedocs_header">
        <div className="managedocs_title">
          <h2>
            {loanname} - {membername}
          </h2>
        </div>
        <hr className="loanhr" />
      </div>
      <div className="managedocs_body">
        <div className="managedocs_uplods">
          <div className="files">
            <div className="file1 file">
              <h2>주민등록 등본</h2>
              <button className="upload_btn">확인</button>
            </div>
            <div className="file2 file">
              <h2>확정 일자부 임대차 계약서</h2>
              <button className="upload_btn">확인</button>
            </div>
            <div className="file3 file">
              <h2>임차주택 건물 등기부등본</h2>
              <button className="upload_btn">확인</button>
            </div>
            <div className="file4 file">
              <h2>결혼예정 증빙 서류</h2>
              <button className="upload_btn">확인</button>
            </div>
            <div className="file5 file">
              <h2>근로자 | 건강보험 자격 실득 확인서</h2>
              <button className="upload_btn">확인</button>
            </div>
          </div>
          <div className="loanapplybtn">
            <button className="finalapply_btn">신청하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageDocs;
