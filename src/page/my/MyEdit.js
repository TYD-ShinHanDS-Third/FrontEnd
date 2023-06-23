import React, { useEffect, useState } from "react";
import "../../css/my/MyEdit.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { Cookies } from "react-cookie";
import { DateComponent } from "@fullcalendar/core/internal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function MyEdit(props) {
  const [userInfo, setUserInfo] = useState({});

  //은행명
  const [bank, setBank] = useState("");

  const bankChange = (event) => {
    setBank(event.target.value);
    setUserInfo({ ...userInfo, accBank: event.target.value });
  };

  //token 가져오기
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  //비밀번호 확인
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState(".");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const inputChange = (e) => {
    if (e.target.name !== "pswdChk") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
    if (e.target.name === "pswdChk") {
      if (userInfo.pswd === e.target.value) {
        setPasswordConfirmMessage("비밀번호 일치");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호 불일치");
        setIsPasswordConfirm(false);
      }
    } else if (e.target.name === "pswd") {
      const passChk = document.getElementById("pswdChk").value;
      if (passChk === e.target.value) {
        setPasswordConfirmMessage("비밀번호 일치");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호 불일치");
        setIsPasswordConfirm(false);
      }
    }
  };

  //저장된 회원정보 가져오기
  useEffect(() => {
    const URL = "/hows/auth/mypage";

    axios
      .get(URL, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
        setBank(res.data.accBank);
        //날짜 데이터 변환
        console.log(res.data.bday);
        let birth = res.data.bday.substring(0, 10);
        //setUserInfo({ ...userInfo, bday: birth });
      })
      .catch((ex) => {
        console.log("fail : " + ex);
      })
      .finally(() => {
        console.log("request end");
      });
  }, []);

  //회원 탈퇴
  function withdraw(token) {
    //확인하는 팝업창 넣기
    confirmAlert({
      title: "탈퇴하시겠습니까?",
      message:
        "탈퇴하면 모든 개인 정보 및 사용 내역은 삭제됩니다. 대출 내역은 은행에서 확인 가능합니다.",
      buttons: [
        {
          label: "탈퇴",
          style: { backgroundColor: "#518e65" },
          onClick: () => {
            const url = "/member/delete";
            axios
              .delete(url, {
                headers: {
                  token: token,
                },
              })
              .then((res) => {
                if (res.data === "success") {
                  console.log("delete success");
                  confirmAlert({
                    title: "탈퇴 완료",
                    message: "",
                    buttons: [
                      {
                        label: "확인",
                        onClick: () => {
                          window.location.href = "/hows";
                        },
                      },
                    ],
                  });
                } else {
                  console.log("delete fail");
                }
              })
              .catch(function (error) {
                console.log(error);
              })
              .finally(() => {
                console.log("request end");
              });
          },
        },
        {
          label: "취소",
          style: { backgroundColor: "#518e65" },
          onClick: () => {},
        },
      ],
    });
  }

  //회원 정보 수정
  function editInfo(token) {
    const url = "/member/update";
    axios
      .put(url, JSON.stringify(userInfo), {
        headers: {
          "Content-Type": `application/json`,
          token: token,
        },
      })
      .then((res) => {
        if (res.data === "success") {
          console.log("update success");
          confirmAlert({
            title: "수정완료",
            buttons: [
              {
                label: "확인",
                style: { backgroundColor: "#518e65" },
                onClick: () => {},
              },
            ],
          });
        } else {
          console.log("update fail");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log("request end");
      });
  }

  return (
    <div className="myEditBody">
      <div className="myEditForm">
        <div className="editContainer1">
          <div className="nameLabel">
            <span>이름</span>
          </div>
          <div className="editItem" id="editName">
            <input
              id="membername"
              name="membername"
              placeholder="이름"
              defaultValue={userInfo.membername}
              readOnly
            />
          </div>
          <div className="idLabel">
            <span>아이디</span>
          </div>
          <div className="editItem" id="editId">
            <input
              id="memberid"
              name="memberid"
              placeholder="아이디"
              defaultValue={userInfo.memberid}
              readOnly
            />
          </div>
          <div className="passLabel">
            <span>비밀번호</span>
          </div>
          <div className="editItem" id="editPw">
            <input
              id="pswd"
              name="pswd"
              placeholder="비밀번호"
              onChange={inputChange}
            />
          </div>
          <div className="passChkLabel">
            <span>비밀번호 확인</span>
          </div>
          <div className="editItem" id="editPwChk">
            <span
              id="passMsg"
              className={`message ${isPasswordConfirm ? "success" : "error"}`}
            >
              {passwordConfirmMessage}
            </span>
            <input
              id="pswdChk"
              name="pswdChk"
              type="password"
              placeholder="비밀번호 확인"
              onChange={inputChange}
            />
          </div>
          <div className="birthLabel">
            <span>생년월일</span>
          </div>
          <div className="editItem" id="editBirth">
            <input
              id="bday"
              name="bday"
              placeholder="생년월일"
              defaultValue={userInfo.bday}
              readOnly
            />
          </div>
          <div className="phoneLabel">
            <span>전화번호</span>
          </div>
          <div className="editItem" id="editPhone">
            <input
              id="phone"
              name="phone"
              placeholder="전화번호"
              defaultValue={userInfo.phone}
              readOnly
            />
          </div>
        </div>
        <div className="editContainer2">
          <div className="editItem" id="addInfo">
            <h3>추가 정보</h3>
          </div>

          <div className="editItem" id="editBank">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-standard-label">
                은행
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                onChange={bankChange}
                label="은행명"
                value={bank}
              >
                <MenuItem value={"신한"}>신한</MenuItem>
                <MenuItem value={"국민"}>국민</MenuItem>
                <MenuItem value={"우리"}>우리</MenuItem>
                <MenuItem value={"하나"}>하나</MenuItem>
              </Select>
            </FormControl>
            <input
              name="accno"
              placeholder="계좌번호"
              value={userInfo.accno}
              onChange={inputChange}
            />
          </div>
          <div className="editItem" id="editHasJob">
            <span>직장유무</span>
            <div className="select">
              <input
                type="radio"
                id="select1"
                name="hasjob"
                value="1"
                label="hasjob"
                checked={userInfo.hasjob === 1 || userInfo.hasjob === "1"}
                onChange={inputChange}
              />
              <label htmlFor="select1">유</label>
              <input
                type="radio"
                id="select2"
                name="hasjob"
                value="0"
                label="hasjob"
                checked={userInfo.hasjob === 0 || userInfo.hasjob === "0"}
                onChange={inputChange}
              />
              <label htmlFor="select2">무</label>
            </div>
          </div>

          <div className="editItem" id="editJob">
            <div className="job">
              <span>직장명</span>
              <input
                name="jobname"
                placeholder="직장명"
                value={userInfo.jobname === null ? "" : userInfo.jobname}
                onChange={inputChange}
              />
            </div>
            <div className="job">
              <span>입사년도</span>
              <input
                id="hiredate"
                name="hiredate"
                placeholder="입사년도"
                value={userInfo.hiredate === null ? "" : userInfo.hiredate}
                onChange={inputChange}
              />
            </div>
          </div>
          <div className="editItem" id="editMarry">
            <span>결혼</span>
            <div className="select">
              <input
                type="radio"
                id="select3"
                name="marry"
                value="0"
                label="marry"
                checked={userInfo.marry === 0 || userInfo.marry === "0"}
                onChange={inputChange}
              />
              <label htmlFor="select3">미혼</label>
              <input
                type="radio"
                id="select4"
                name="marry"
                value="1"
                label="marry"
                checked={userInfo.marry === 1 || userInfo.marry === "1"}
                onChange={inputChange}
              />
              <label htmlFor="select4">기혼</label>
            </div>
          </div>

          <div className="editItem" id="editHasChild">
            <span>자녀</span>
            <div className="select">
              <input
                type="radio"
                id="select5"
                name="haschild"
                value="0"
                label="haschild"
                checked={userInfo.haschild === 0 || userInfo.haschild === "0"}
                onChange={inputChange}
              />
              <label htmlFor="select5">무</label>
              <input
                type="radio"
                id="select6"
                name="haschild"
                value="1"
                label="haschild"
                checked={userInfo.haschild === 1 || userInfo.haschild === "1"}
                onChange={inputChange}
              />
              <label htmlFor="select6">1명</label>
              <input
                type="radio"
                id="select7"
                name="haschild"
                value="2"
                label="haschild"
                checked={userInfo.haschild === 2 || userInfo.haschild === "2"}
                onChange={inputChange}
              />
              <label htmlFor="select7">2명이상</label>
            </div>
          </div>
        </div>
      </div>
      <div className="deleteSave">
        <button
          id="deleteBtn"
          onClick={() => withdraw(token)}
          disabled={!isPasswordConfirm}
        >
          탈퇴
        </button>
        <button
          id="saveBtn"
          onClick={() => editInfo(token)}
          disabled={!isPasswordConfirm}
        >
          저장
        </button>
      </div>
    </div>
  );
}
export default MyEdit;
