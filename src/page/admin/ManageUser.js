import React, { useCallback, useEffect, useState } from "react";
import "../../css/admin/ManagerUser.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Cookies } from "react-cookie";
import axios from "axios";

function ManageUser(props) {
  const [userList, setUserList] = useState([]);
  const [userPageNum, setUserPageNum] = useState("0");
  const [userPageTotal, setUserListTotal] = useState("0");
  const [roleInfo, setRoleInfo] = useState([]);

  useEffect(() => {
    getUserList();
  }, [userPageNum]);

  const callback = useEffect(() => {
    var roleList = [];
    userList.map((item, index) => {
      console.log(item);
      var myrole = {
        id: item.memberid,
        role: item.roles,
      };
      roleList.push(myrole);
    });
    setRoleInfo(roleList);
  }, [userPageNum]);

  async function getUserList() {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    const listurl = "/hows/admin/user";

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
        setUserList(response.data.obj);
        setUserListTotal(response.data.total);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function editUserInfo(userid, userrole) {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    const listurl = "/hows/admin/user";

    await axios
      .put(listurl, {
        params: {
          userid: userid,
          userrole: userrole,
        },
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleChange = (event) => {};

  const bdaystr = (bday) => {
    let birth = bday.substring(0, 10);
    return birth;
  };

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
    <div>
      <div className="usertopbar">{createBtn(userPageTotal)}</div>
      <div className="manageuser">
        <div className="userdetailtable">
          <table className="userdetailtable">
            <thead>
              <tr className="usertablebox">
                <th className="userid">아이디</th>
                <th className="username">이름</th>
                <th className="useremail">e-mail</th>
                <th className="userbd">생년월일</th>
                <th className="userrole">역할</th>
                <th className="useredit"></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item, index) => {
                console.log(roleInfo[index].role);
                return (
                  <tr className="usertablebox">
                    <td className="userid" key={item.memberid}>
                      {item.memberid}
                    </td>
                    <td className="username">{item.membername}</td>
                    <td className="useremail">번호</td>
                    <td className="userbd">{bdaystr(item.bday)} </td>

                    <td className="userrole">
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={roleInfo[index]}
                        onChange={handleChange}
                      >
                        <MenuItem value={"USER"}>USER</MenuItem>
                        <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                        <MenuItem value={"BANK"}>BANK</MenuItem>
                      </Select>
                    </td>
                    <td className="useredit">
                      <button
                        className="usereditbtn"
                        style={{ color: "black" }}
                        onClick={() => editUserInfo(item.memberid)}
                      >
                        역할 수정하기
                      </button>
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

export default ManageUser;
