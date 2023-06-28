import React, { useEffect, useState } from "react";
import "../../css/admin/Modal.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function CheckUserWork({ pdfUrl, closeModal }) {
  // 파일 보기
  const close = () => {
    closeModal();
  };
  return (
    <div className="loanModal">
      <div className="loanmodalclose">
        <button className="closeloanmodal" onClick={() => close()}>
          X
        </button>
      </div>
      <Document
        file={pdfUrl.workFile}
        //onLoadSuccess={onDocumentLoadSucess}
        className="loanModalBody"
      ></Document>
    </div>
  );
}

export default CheckUserWork;
