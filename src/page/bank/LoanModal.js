import React from "react";
import { useState } from "react";
import "../../css/admin/Modal.css";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { confirmAlert } from "react-confirm-alert";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function LoanModal({ pageNumber, pdfUrl, closeModal }) {
  console.log(pageNumber.pageNumber);
  const [numPages, setNumPages] = useState(null);
  const [page, setPageNumber] = useState(pageNumber.pageNumber);
  // 파일 보기
  function movePage(page) {
    setNumPages(numPages);
  }
  const close = () => {
    closeModal();
  };
  function onDocumentLoadSucess({ numPages }) {
    setNumPages(numPages);
  }
  const nextPage = () => {
    if (numPages > page) {
      setPageNumber(page + 1);
    }
    if (numPages === page) {
      confirmAlert({
        title: "",
        message: "마지막 페이지입니다.",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
            style: { backgroundColor: "#eef1e6" },
          },
        ],
      });
    }
  };

  const beforePage = () => {
    if (page > 1) {
      setPageNumber(page - 1);
    }
    if (1 === page) {
      confirmAlert({
        title: "",
        message: "첫번째 페이지입니다.",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
            style: { backgroundColor: "#eef1e6" },
          },
        ],
      });
    }
  };
  return (
    <div className="loanModal">
      <div className="loanmodalclose">
        <button
          className="closeloanmodal"
          onClick={() => close()}
          style={{ backgroundColor: "#A4BC92" }}
        >
          X
        </button>
      </div>
      <Document
        file={pdfUrl.pdfUrl}
        onLoadSuccess={onDocumentLoadSucess}
        className="loanModalBody"
      >
        <Page pageNumber={page} renderTextLayer={false}></Page>
      </Document>
      <div className="loanodalbtn">
        <button
          className="loanleft"
          onClick={() => beforePage()}
          style={{ backgroundColor: "#A4BC92" }}
        >
          이전
        </button>
        <button
          className="loanright"
          onClick={() => nextPage()}
          style={{ backgroundColor: "#A4BC92" }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default LoanModal;
