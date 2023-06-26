import React from "react";
import { useState } from "react";
import "../../css/admin/Modal.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { width } from "@mui/system";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function LoanModal({ pageNumber, pdfUrl }) {
  console.log(pageNumber.pageNumber);
  const [numPages, setNumPages] = useState(null);
  const [page, setPageNumber] = useState(pageNumber.pageNumber);
  // 파일 보기
  function onDocumentLoadSucess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div className="loanModal">
      <Document
        file={pdfUrl.pdfUrl}
        onLoadSuccess={onDocumentLoadSucess}
        className="loanModalBody"
        style={{ height: "30px" }}
      >
        <Page
          pageNumber={page}
          renderTextLayer={false}
          className="loanModal"
        ></Page>
      </Document>
      <button>왼쪽</button>
      <button>오른쪽</button>
    </div>
  );
}

export default LoanModal;
