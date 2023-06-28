import React, { useCallback, useEffect, useState } from "react";
import "../../css/admin/ManagerUser.css";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Cookies } from "react-cookie";
import axios from "axios";
import CheckUserWork from "./CheckUserWork";
import ModalBack from "./ModalBack";

function ManageUser(props) {
  const [userList, setUserList] = useState([]);
  const [userPageNum, setUserPageNum] = useState("0");
  const [userPageTotal, setUserListTotal] = useState("0");
  const [role, setRole] = useState("");
  const [roleInfo, setRoleInfo] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    getUserList();
  }, [userPageNum]);

  useEffect(() => {
    var roleList = [];
    userList.map((item, index) => {
      var myrole = {
        id: item.memberid,
        role: item.roles,
      };
      roleList.push(myrole);
    });
    setRoleInfo(roleList);
  }, [userList]);

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
        console.log(response.data.obj);
        setUserList(response.data.obj);
        setUserListTotal(response.data.total);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function editUserInfo(userid, userrole, useremail) {
    console.log(userrole);
    console.log(userid);
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");
    const listurl = "/hows/admin/user";

    await axios
      .put(
        listurl,
        { memberid: userid },
        {
          params: {
            memberid: userid,
            roles: userrole,
            email: useremail,
          },
          headers: {
            "Content-type": "application/json",
            token: token,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data === "발송성공") {
          alert("회원에게 메일 전송이 완료 되었습니다.");
        } else {
          alert("회원에게 메일 전송이 되지 않았습니다.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const printRole = (item, index) => {
    return (
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={roleInfo[index].role}
        name={item.memberid}
        onChange={handleChange}
      >
        <MenuItem value={"USER"}>USER</MenuItem>
        <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
        <MenuItem value={"TELLER"}>TELLER</MenuItem>
      </Select>
    );
  };
  const handleChange = (event) => {
    const inputRole = event.target.value;
    const inputId = event.target.name;

    let tmp = [...roleInfo];

    tmp.map((item, index) => {
      if (tmp[index].id === inputId) {
        tmp[index].role = inputRole;
        setRole(tmp);
      }
    });
  };

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

  function openModal(memberid) {
    getFiles(memberid);

    setPdfUrl(workFile);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  //재직증명서 보기
  const [workFile, setWorkFile] = useState("");

  async function getFiles(memberid) {
    const listurl = "/hows/loan/detail/getworkdocs";
    await axios
      .get(listurl, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          memberid: memberid,
        },
      })
      .then(function (response) {
        console.log(response.data);

        setWorkFile(response.data.workdocs);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="manageruser">
      {modalOpen && <ModalBack setModalOpen={setModalOpen} />}
      <div className="usertopbar">{createBtn(userPageTotal)}</div>
      <div className="manageuser">
        <div className="userdetailtable">
          <table className="userdetailtable">
            <thead>
              <tr className="usertablebox" key={0}>
                <th className="userid">아이디</th>
                <th className="username">이름</th>
                <th className="useremail">e-mail</th>
                <th className="userwork">재직증명서</th>
                <th className="userbd">생년월일</th>
                <th className="userrole">역할</th>
                <th className="userwant">신청 역할</th>
                <th className="useredit"></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item, index) => {
                return (
                  <tr className="usertablebox" key={item.memberid}>
                    <td className="userid">{item.memberid}</td>
                    <td className="username">{item.membername}</td>
                    <td className="useremail">{item.email}</td>
                    <td className="userwork">
                      <button
                        className="userworkbtn"
                        onClick={() => openModal(item.memberid)}
                        style={{
                          display: item.email === null ? "none" : "block",
                        }}
                      >
                        재직증명서 확인
                      </button>
                    </td>
                    <td className="userbd">{bdaystr(item.bday)} </td>
                    {roleInfo[index] && (
                      <td className="userrole">{printRole(item, index)}</td>
                    )}
                    <td className="userwant">{item.wantRole}</td>
                    <td className="useredit">
                      <button
                        className="usereditbtn"
                        style={{ color: "black" }}
                        onClick={() =>
                          editUserInfo(
                            item.memberid,
                            roleInfo[index].role,
                            item.email
                          )
                        }
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
      {modalOpen && (
        <CheckUserWork pdfUrl={{ workFile }} closeModal={closeModal} />
      )}
    </div>
  );
}

export default ManageUser;
