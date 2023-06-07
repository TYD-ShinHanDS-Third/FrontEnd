import React from "react";
import "../../css/loan/LoanUploadDoc.css";
import { Link } from "react-router-dom";

function LoanUploadDoc(props) {
  return (
    <div className="uplods">
      <div className="files">
        <div className="file1 file">
          <h2>주민등록 등본</h2>
          <button className="upload_btn">업로드</button>
        </div>
        <div className="file2 file">
          <h2>확정 일자부 임대차 계약서</h2>
          <button className="upload_btn">업로드</button>
        </div>
        <div className="file3 file">
          <h2>임차주택 건물 등기부등본</h2>
          <button className="upload_btn">업로드</button>
        </div>
        <div className="file4 file">
          <h2>결혼예정 증빙 서류</h2>
          <button className="upload_btn">업로드</button>
        </div>
        <div className="file5 file">
          <h2>근로자 | 건강보험 자격 실득 확인서</h2>
          <button className="upload_btn">업로드</button>
        </div>
      </div>

      <div className="loanapplybtn">
        <div className="file_desc">
          <p>
            지정된 서류가 맞는지 다시 확인 부탁드립니다. <br />
            서류 확인 후 심사까지는 최소 3~4일까지 소요됩니다. <br />
            심사 후 결과는 핸드폰 번호로 안내될 예정입니다.
          </p>
        </div>
        <Link to="/hows/loan/detail/consult/success" style={{}}>
          <button className="finalapply_btn">신청하기</button>
        </Link>
      </div>
    </div>
  );
}

export default LoanUploadDoc;
