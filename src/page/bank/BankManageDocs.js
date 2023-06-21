import axios from "axios";
import React from "react";
import { confirmAlert } from "react-confirm-alert";
import { useLocation } from "react-router-dom";

function BankManageDocs(props) {
  const location = useLocation();
  console.log(location.state);
  const membername = location.state.membername;
  const memberphone = location.state.tel.replaceAll("-", "");
  const loanname = location.state.loanname;
  const loanid = location.state.loanid;

  //승인 및 거절
  const apply = () => {
    const url = "http://192.168.0.55:8888/hows/bank/approval";
    axios
      .put(url, null, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          memloanid: loanid,
          membername: membername,
          tel: memberphone,
          loanname: loanname,
        },
      })
      .then((res) => {
        if (res.data === "success") {
          console.log("update success");
          confirmAlert({
            title: "승인 완료",
            buttons: [
              {
                label: "확인",
                style: { backgroundColor: "#9db2bf" },
                onClick: () => {},
              },
            ],
          });
        } else {
          console.log("update fail");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log("request end");
      });
  };
  const refuse = () => {
    const url = "http://192.168.0.55:8888/hows/bank/refusal";
    axios
      .put(url, null, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          memloanid: loanid,
          membername: membername,
          tel: memberphone,
          loanname: loanname,
        },
      })
      .then((res) => {
        if (res.data === "success") {
          console.log("update success");
          confirmAlert({
            title: "거절 완료",
            buttons: [
              {
                label: "확인",
                style: { backgroundColor: "#9db2bf" },
                onClick: () => {},
              },
            ],
          });
        } else {
          console.log("update fail");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log("request end");
      });
  };
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
              <h2 style={{ backgroundColor: "#A4BC92" }}>주민등록 등본</h2>
              <button
                className="upload_btn"
                style={{ backgroundColor: "#EAE7B1", color: "black" }}
              >
                확인
              </button>
            </div>
            <div className="file2 file">
              <h2 style={{ backgroundColor: "#A4BC92" }}>
                확정 일자부 임대차 계약서
              </h2>
              <button
                className="upload_btn"
                style={{ backgroundColor: "#EAE7B1", color: "black" }}
              >
                확인
              </button>
            </div>
            <div className="file3 file">
              <h2 style={{ backgroundColor: "#A4BC92" }}>
                임차주택 건물 등기부등본
              </h2>
              <button
                className="upload_btn"
                style={{ backgroundColor: "#EAE7B1", color: "black" }}
              >
                확인
              </button>
            </div>
            <div className="file4 file">
              <h2 style={{ backgroundColor: "#A4BC92" }}>결혼예정 증빙 서류</h2>
              <button
                className="upload_btn"
                style={{ backgroundColor: "#EAE7B1", color: "black" }}
              >
                확인
              </button>
            </div>
            <div className="file5 file">
              <h2 style={{ backgroundColor: "#A4BC92" }}>
                근로자 | 건강보험 자격 실득 확인서
              </h2>
              <button
                className="upload_btn"
                style={{ backgroundColor: "#EAE7B1", color: "black" }}
              >
                확인
              </button>
            </div>
          </div>
          <div className="loanapplybtn">
            <button
              className="finalapply_btn"
              style={{ backgroundColor: "#285430", color: "white" }}
              onClick={apply}
            >
              승인하기
            </button>
            <button
              className="finalapply_btn"
              style={{ backgroundColor: "#285430", color: "white" }}
              onClick={refuse}
            >
              거절하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankManageDocs;
