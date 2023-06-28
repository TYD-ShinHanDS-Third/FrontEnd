import axios from "axios";
import { Cookies } from "react-cookie";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useLocation } from "react-router-dom";
import LoanModal from "../bank/LoanModal";
import { Document, pdfjs, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function BankManageDocs(props) {
  const location = useLocation();
  console.log(location.state);
  const membername = location.state.membername;
  const memberphone = location.state.tel.replaceAll("-", "");
  const loanname = location.state.loanname;
  const loanid = location.state.loanid;

  const [EmploymentProof, setEmploymentProof] = useState("");
  const [LeaseContract, setLeaseContract] = useState("");
  const [MarriageProof, setMarriageProof] = useState("");
  const [PropertyRegistration, setPropertyRegistration] = useState("");
  const [ResidenceRegistration, setResidenceRegistration] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  // 파일 보기
  function onDocumentLoadSucess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    getFiles();
  }, [loanid]);

  async function getFiles() {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    const listurl = "/hows/loan/detail/getdocs";
    await axios
      .get(listurl, {
        headers: {
          token: token,
        },
        params: {
          loanid: loanid,
        },
      })
      .then(function (response) {
        setEmploymentProof(response.data.EmploymentProof);
        setLeaseContract(response.data.LeaseContract);
        setMarriageProof(response.data.MarriageProof);
        setPropertyRegistration(response.data.PropertyRegistration);
        setResidenceRegistration(response.data.ResidenceRegistration);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //승인 및 거절
  const apply = () => {
    const url = "/hows/bank/approval";
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
      });
  };
  const refuse = () => {
    const url = "/hows/bank/refusal";
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
      });
  };

  const openModal = (pdfUrl) => {
    setPdfUrl(pdfUrl);
  };

  function closeModal() {
    setModalOpen(false);
  }

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
                onClick={() => {
                  setModalOpen(true);
                  openModal(EmploymentProof);
                }}
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
                onClick={() => {
                  setModalOpen(true);
                  openModal(EmploymentProof);
                }}
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
                onClick={() => {
                  setModalOpen(true);
                  openModal(LeaseContract);
                }}
                style={{ backgroundColor: "#EAE7B1", color: "black" }}
              >
                확인
              </button>
            </div>
            <div className="file4 file">
              <h2 style={{ backgroundColor: "#A4BC92" }}>결혼예정 증빙 서류</h2>
              <button
                className="upload_btn"
                onClick={() => {
                  setModalOpen(true);
                  openModal(MarriageProof);
                }}
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
                onClick={() => {
                  setModalOpen(true);
                  openModal(ResidenceRegistration);
                }}
                style={{ backgroundColor: "#EAE7B1", color: "black" }}
              >
                확인
              </button>
            </div>
          </div>
          <div className="loanapplybtn">
            <button
              className="finalapply_btn app"
              style={{ backgroundColor: "#DB4455", color: "white" }}
              onClick={apply}
            >
              승인하기
            </button>
            <button
              className="finalapply_btn ref"
              style={{ backgroundColor: "#285430", color: "white" }}
              onClick={refuse}
            >
              거절하기
            </button>
          </div>
        </div>
      </div>
      <div className="loanModaldiv">
        {modalOpen && (
          <LoanModal
            pdfUrl={{ pdfUrl }}
            pageNumber={{ pageNumber }}
            closeModal={closeModal}
            className="loanModaldiv"
          />
        )}
      </div>
    </div>
  );
}

export default BankManageDocs;
