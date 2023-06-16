import React from "react";
import "../../css/admin/Modal.css";

function CheckUserWork({ setModalOpen, id, title, content, writer }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="modalcontainer">
      <button className="modalclose" onClick={closeModal}>
        X
      </button>
      <p>모달창입니다.</p>
    </div>
  );
}

export default CheckUserWork;
