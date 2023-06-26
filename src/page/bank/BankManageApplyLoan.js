import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

function BankManageApplyLoan(props) {
  const [userList, setUserList] = useState([]);
  const [userPageNum, setUserPageNum] = useState("0");
  const [userPageTotal, setUserListTotal] = useState("0");

  useEffect(() => {
    getUserList();
  }, [userPageNum]);

  async function getUserList() {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/bank/form";

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
        console.log(response.data);
        setUserList(response.data);
        console.log(userList);
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
          style={{ backgroundColor: "#F9FBE7", color: "black" }}
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
          <table
            className="userdetailtable"
            style={{ backgroundColor: "#F9FBE7" }}
          >
            <thead>
              <tr
                className="userloanbox"
                style={{ backgroundColor: "#F9FBE7" }}
              >
                <th className="userid">아이디</th>
                <th className="username">이름</th>
                <th className="userloan">신청상품</th>
                <th className="userstate">대출신청상태</th>
                <th className="userdocs">서류제출확인</th>
              </tr>
            </thead>
            <tbody>
              {userList &&
                userList.map((item, index) => {
                  return (
                    <tr
                      className="userloanbox"
                      style={{ backgroundColor: "#F9FBE7" }}
                    >
                      <td className="userid" key={item.memberid.memberid}>
                        {item.memberid.memberid}
                      </td>
                      <td className="username">{item.memberid.membername}</td>

                      <td className="userloan">
                        [{item.bankname}] {item.loanname.loanname}{" "}
                      </td>

                      <td className="userstate">{item.loanstate}</td>
                      <td className="userdocs">
                        <Link
                          to="/hows/bank/loanlist/detail"
                          state={{
                            membername: userList[index].memberid.membername,
                            loanname: userList[index].loanname.loanname,
                            tel: userList[index].memberid.phone,
                            loanid: item.loanid,
                          }}
                          style={{
                            textDecoration: "none",
                            width: "100%",
                            color: "green",
                          }}
                        >
                          <button
                            className="usereditbtn"
                            style={{
                              color: "black",
                              backgroundColor: "#609966",
                            }}
                          >
                            서류확인
                          </button>
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

export default BankManageApplyLoan;
