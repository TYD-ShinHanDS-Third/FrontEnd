import React, { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";
import ManageUser from "./ManageUser";
import ConsultingList from "./ConsultingList";
import ManageDocs from "./ManageDocs";
import ManageApplyLoan from "./ManageApplyLoan";
import Consulting from "./Consulting";
import axios from "axios";
import { Cookies } from "react-cookie";

function ManPage(props) {
  document.body.style.backgroundColor = "#9DC08B";
  const [userConList, setUserConsultList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [pageNum, setPageNum] = useState(0);

  // useEffect(() => {
  //   getUserList();
  // }, []);

  // useEffect(() => {
  //   userCList();
  // }, []);

  //사용지 확인 - get
  async function getUserList() {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/admin/user";

    await axios
      .get(listurl, {
        params: {
          page: pageNum,
          size: "9",
        },
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      })
      .then(function (response) {
        setUserList(response.data.obj);
        setPageTotal(response.data.total);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //사용지 확인 - put
  async function putUserList(userid, userrole) {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/admin/user";

    await axios
      .put(
        listurl,
        { userid: userid, userrole: userrole },
        {
          headers: {
            "Content-type": "application/json",
            token: token,
          },
        }
      )
      .then(function (response) {
        setUserConsultList(response.data.obj);
        setPageTotal(response.data.total);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //회원 상담  - 조회
  async function userCList() {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/admin/consult";

    await axios
      .get(listurl, {
        params: {
          page: pageNum,
          size: "9",
        },
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      })
      .then(function (response) {
        setUserConsultList(response.data);
        setPageTotal(response.data.total);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Routes>
      <Route
        path="user"
        element={<ManageUser userList={userList} putUserList={putUserList} />}
      ></Route>
      <Route path="consult" element={<ConsultingList />}></Route>
      <Route path="form" element={<ManageApplyLoan />}></Route>
      <Route path="form/checklist" element={<ManageDocs />}></Route>
      <Route path="consult/chatroom" element={<Consulting />}></Route>
    </Routes>
  );
}

export default ManPage;
