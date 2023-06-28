import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import ManageUser from "./ManageUser";
import ConsultingList from "./ConsultingList";
import ManageDocs from "./ManageDocs";
import ManageApplyLoan from "./ManageApplyLoan";
import Consulting from "./Consulting";
import axios from "axios";
import { Cookies } from "react-cookie";
import AdminImgCom from "./AdminImgCom";

function ManPage(props) {
  document.body.style.backgroundColor = "#DDE6ED";

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    const url = "/hows/admin/check";
    const requestUrl = "/hows/admin";
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
          token: token,
        },
        params: {
          url: requestUrl,
        },
      })
      .then((res) => {})
      .catch((ex) => {
        console.log("requset fail : " + ex);
        if (ex.response.status === 403) {
          window.location.href = "/hows/noauth";
        }
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminImgCom />}></Route>
        <Route path="user" element={<ManageUser />}></Route>
        <Route path="consult" element={<ConsultingList />}></Route>
        <Route path="form" element={<ManageApplyLoan />}></Route>
        <Route path="form/checklist" element={<ManageDocs />}></Route>
        <Route path="consult/chatroom" element={<Consulting />}></Route>
      </Routes>
    </div>
  );
}

export default ManPage;
