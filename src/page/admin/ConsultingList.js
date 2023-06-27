import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link, useLocation } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

function ConsultingList(props) {
  const [userConList, setUserConsultList] = useState([]);
  const [userPageNum, setUserPageNum] = useState("0");
  const [userPageTotal, setUserListTotal] = useState("0");

  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  useEffect(() => {
    userCList();
  }, [userPageNum]);

  //회원 상담  - 조회
  async function userCList() {
    const listurl = "/hows/admin/consult";

    await axios
      .get(listurl, {
        params: {
          page: userPageNum,
          size: "10",
        },
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      })
      .then(function (response) {
        setUserConsultList(response.data);
        console.log(response.data);
        setUserListTotal(response.data[0].total);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const createBtn = (userPageTotal) => {
    let paging = userPageTotal / 10;
    let btns = [];
    for (let i = 0; i < paging; i++) {
      let btn_name = "btn_" + i;
      btns.push(
        <button
          className="userpagebtn"
          id={btn_name}
          onClick={() => changePage(i)}
        >
          {i + 1}
        </button>
      );
    }
    if (userPageTotal) return btns;
  };

  const changePage = (p) => {
    setUserPageNum(p);
  };

  return (
    <div className="manageruser">
      <div className="usertopbar">{createBtn(userPageTotal)}</div>
      <div className="manageuser">
        <div className="userdetailtable">
          <table className="userdetailtable">
            <thead>
              <tr className="userconsultbox">
                <th className="userid">아이디</th>
                <th className="username">이름</th>
                <th className="userloan">상담 신청 상품</th>
                <th className="userloanstate">대출 신청 상태</th>
                <th className="enterroom"></th>
              </tr>
            </thead>
            <tbody>
              {userConList.map((item, index) => {
                return (
                  <tr className="userconsultbox" key={item.memberid.memberid}>
                    <td className="userid">{item.memberid.memberid}</td>
                    <td className="username">{item.membername}</td>
                    <td className="userloan">
                      [{item.bankname}] {item.loanname.loanname}
                    </td>
                    <td className="userloanstate">{item.loanstate}</td>
                    <td className="enterroom">
                      <Link
                        to="/hows/admin/consult/chatroom"
                        style={{ textDecoration: "none", color: "blue" }}
                        state={{
                          bankname: item.bankname,
                          loanname: item.loanname.loanname,
                          loanid: item.loanid,
                          room: item.roomnumber,
                          token: token,
                        }}
                      >
                        상담방 입장
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ConsultingList;
