import React, { useEffect, useState } from "react";
import "../../css/my/MyEdit.css";
import {
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  radioClasses,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import axios from "axios";

function MyEdit(props) {
  const [userInfo, setUserInfo] = useState({
    memberId: "",
    pswd: "",
    memberName: "",
    bDay: "",
    phone: "",
    role: "",
    level: "",
    accBank: "",
    accNo: "",
    hasJob: "",
    jobName: "",
    hireDate: "",
    marry: "",
    hasChild: "",
  });

  const [bank, setBank] = useState("");

  const bankChange = (event) => {
    setBank(event.target.value);
    setUserInfo({ ...userInfo, accBank: bank });
    console.log(userInfo.accBank);
  };

  const inputChange = (event) => {
    setUserInfo(...event.target.value);
    //document.querySelector('input[name="pnt"]:checked').val();
  };

  useEffect(() => {
    const URL = "http://localhost:3000/data/myPage/members.json";
    axios
      .get(URL, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.dir(res);

        setUserInfo(res.data);
        setBank(userInfo.accBank);
      })
      .catch((ex) => {
        console.log("fail : " + ex);
      })
      .finally(() => {
        console.log("request end");
      });
  }, []);

  // const bankArea = document
  //   .getElementById("demo-simple-select-standard").child
  // const bankArea = document.querySelector(
  //   ".MuiSelect-nativeInput css-yf8vq0-MuiSelect-nativeInput"
  // );
  // bankArea = "신한";
  // console.log("useInfo_bank2" + bankArea);
  console.log("useInfo_bank" + userInfo.accBank);

  console.log("userInfo:" + userInfo.memberId);
  return (
    <div className="myEditBody">
      <div className="editContainer1">
        <div className="editItem" id="editName">
          <input
            id="memberName"
            name="memberName"
            placeholder="이름"
            value={userInfo.memberName}
            onChange={inputChange}
          />
        </div>
        <div className="editItem" id="editId">
          <input
            id="memberId"
            name="memberId"
            placeholder="아이디"
            value={userInfo.memberId}
            readOnly
          />
        </div>
        <div className="editItem" id="editPw">
          <input
            id="pswd"
            name="pswd"
            placeholder="비밀번호"
            value={userInfo.pswd}
            onChange={inputChange}
          />
        </div>
        <div className="myEditBtn">
          <button>수정</button>
        </div>
        <div className="editItem" id="editPwChk">
          <input id="pswdChk" name="pswdChk" placeholder="비밀번호 확인" />
        </div>
        <div className="editItem" id="editBirth">
          <input
            id="bDay"
            name="bDay"
            placeholder="생년월일"
            value={userInfo.bDay}
            readOnly
          />
        </div>
        <div className="deleteBtn">
          <button>탈퇴</button>
        </div>
        <div className="editItem" id="editPhone">
          <input
            id="phone"
            name="phone"
            placeholder="전화번호"
            value={userInfo.phone}
            readOnly
          />
        </div>
      </div>
      <div className="editContainer2">
        <div className="editItem" id="addInfo">
          추가 정보
        </div>
        <div className="saveBtn">
          <button>저장</button>
        </div>
        <div className="editItem" id="editBank">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-standard-label">은행</InputLabel>
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
            name="accNo"
            placeholder="계좌번호"
            value={userInfo.accNo}
            onChange={inputChange}
          />
        </div>
        <div className="editItem" id="editHasJob">
          <span>직장유무</span>
          <div className="select">
            <input
              type="radio"
              id="select1"
              name="hasJob"
              value="true"
              label="hasJob"
              checked={userInfo.hasJob === true}
            />
            <label htmlFor="select1">유</label>
            <input
              type="radio"
              id="select2"
              name="hasJob"
              value="false"
              label="hasJob"
              checked={userInfo.hasJob === false}
            />
            <label htmlFor="select2">무</label>
          </div>
        </div>

        <div className="editItem" id="editJob">
          <input
            name="jobName"
            placeholder="직장명"
            value={userInfo.jobName}
            onChange={inputChange}
          />
          <input
            id="hireDate"
            name="hireDate"
            placeholder="입사년도"
            value={userInfo.hireDate}
            onChange={inputChange}
          />
        </div>
        <div className="editItem" id="editMarry">
          <span>결혼</span>
          <div className="select">
            <input
              type="radio"
              id="select3"
              name="marry"
              value="false"
              label="marry"
              checked={userInfo.marry === false}
            />
            <label htmlFor="select3">미혼</label>
            <input
              type="radio"
              id="select4"
              name="marry"
              value="true"
              label="marry"
              checked={userInfo.marry === true}
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
              name="hasChild"
              value="false"
              label="hasChild"
              checked={userInfo.hasChild === "0"}
            />
            <label htmlFor="select5">무</label>
            <input
              type="radio"
              id="select6"
              name="hasChild"
              value="true"
              label="hasChild"
              checked={userInfo.hasChild === "1"}
            />
            <label htmlFor="select6">1명</label>
            <input
              type="radio"
              id="select7"
              name="hasChild"
              value="true"
              label="hasChild"
              checked={userInfo.hasChild === "2"}
            />
            <label htmlFor="select7">2명이상</label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyEdit;
