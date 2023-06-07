import React from "react";

import { Route, Routes } from "react-router-dom";
import ManageUser from "./ManageUser";
import ConsultingList from "./ConsultingList";
import ManageDocs from "./ManageDocs";
import ManageApplyLoan from "./ManageApplyLoan";
import Consulting from "./Consulting";

function ManPage(props) {
  document.body.style.backgroundColor = "#9DC08B";
  return (
    <Routes>
      <Route path="user" element={<ManageUser />}></Route>
      <Route path="consult" element={<ConsultingList />}></Route>
      <Route path="form" element={<ManageApplyLoan />}></Route>
      <Route path="form/checklist" element={<ManageDocs />}></Route>
      <Route path="consult/chatroom" element={<Consulting />}></Route>
    </Routes>
  );
}

export default ManPage;
