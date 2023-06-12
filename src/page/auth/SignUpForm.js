import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function SignUpForm(props) {
  //은행명
  const [bank, setBank] = React.useState("");

  const bankChange = (event) => {
    setBank(event.target.value);
    setMember({ ...member, accBank: event.target.value });
  };

  //추가 정보 입력창 오픈
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
    if (!open === false) {
      setMember({
        ...member,
        accBank: "",
        accno: "",
        hasjob: null,
        roles: "USER",
        jobname: "",
        hiredate: null,
        marry: null,
        haschild: null,
      });
    }
  };

  //멤버 초기화
  const memberInit = {
    memberid: "",
    membername: "",
    pswd: "",
    bday: null,
    phone: "",
    roles: "USER",
    accBank: "",
    accno: "",
    hasjob: "",
    hiredate: null,
    marry: "",
    haschild: "",
    jobname: "",
  };

  const [member, setMember] = useState(memberInit);

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = useState("중복인지 확인해주세요");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [birthMessage, setBirthMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isPhone, setIsPhone] = useState(false);
  const [isBirth, setIsBirth] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  //아이디 중복 체크
  const [isCheckId, setIsCheckId] = useState(false);

  //전화번호 인증 여부 확인
  const [authAns, setAuthAns] = useState(""); //인증번호
  const [authInput, setAuthInput] = useState(""); //사용자가 입력한 인증번호
  const [isCheckPhone, setIsCheckPhone] = useState(false);
  const handleAuth = (e) => {
    setAuthInput(e.target.value);
  };

  //input창에 입력 시 처리(+유효성 검사)
  const handleSignup = (e) => {
    if (e.target.name !== "pswdChk") {
      setMember({ ...member, [e.target.name]: e.target.value });
      console.log(member);
    }

    if (e.target.name === "memberid") {
      setIsCheckId(false);
    } else if (e.target.name === "phone") {
      const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
      if (!phoneRegex.test(e.target.value)) {
        setPhoneMessage("전화번호 형식이 틀렸어요 010-0000-0000");
        setIsPhone(false);
      } else {
        setPhoneMessage("올바른 전화번호 형식이에요 : )");
        setIsPhone(true);
      }
    } else if (e.target.name === "bday") {
      const birthRegex =
        /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (!birthRegex.test(e.target.value)) {
        setBirthMessage("생년월일 형식이 틀렸어요 1900-01-01");
        setIsBirth(false);
      } else {
        setBirthMessage("올바른 생년월일 형식이에요 : )");
        setIsBirth(true);
      }
    } else if (e.target.name === "pswdChk") {
      if (member.pswd === e.target.value) {
        setPasswordConfirmMessage("비밀번호가 일치해요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요");
        setIsPasswordConfirm(false);
      }
    } else if (e.target.name === "pswd") {
      const passChk = document.getElementById("pswdChk").value;
      if (passChk === e.target.value) {
        setPasswordConfirmMessage("비밀번호가 일치해요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요");
        setIsPasswordConfirm(false);
      }
    }
  };

  //아이디 중복 체크
  const checkId = (event) => {
    const url = "/member/checkDuplicateId";
    axios
      .get(url, {
        params: {
          memberid: member.memberid,
        },
      })
      .then((res) => {
        console.dir(res.data);
        if (res.data === "사용가능한아이디입니다.") {
          console.log("아이디 사용 가능");
          setIsCheckId(true);
          setIdMessage("사용 가능한 아이디)");
        } else {
          console.log("아이디 사용 불가");
          setIsCheckId(false);
          setIdMessage("사용 불가한 아이디)");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log("request end");
      });
  };

  //전화번호 인증
  const checkPhone = (event) => {
    //난수 받아와서 사용자 입력과 같은지 비교
    if (!isPhone) {
      alert("전화번호를 입력해주세요");
    } else {
      var authbox = document.getElementById("authBox");
      authbox.style.display = "block";
      const url = "/member/authPhone";
      setAuthAns("1234");
      // axios
      //   .post(url, JSON.stringify(member.phone), {
      //     headers: {
      //       "Content-Type": `application/json`,
      //     },
      //   })
      //   .then((res) => {
      //     setAuthAns("res.data.authNum");
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .finally(() => {
      //     console.log("request end");
      //   });
    }
  };

  //전화번호 인증번호 확인
  const clickAuth = (e) => {
    if (authInput === authAns) {
      setIsCheckPhone(true);
    } else {
      console.log("num" + authInput);
      console.log("auth" + authAns);
      alert("인증번호가 틀렸습니다.");
    }
  };

  //회원가입
  function signup() {
    const url = "/member/signup";
    console.log(member);

    axios
      .post(url, JSON.stringify(member), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        if (res.data === "success.") {
          console.log("signup success");
        } else {
          console.log("signup fail");
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
    <div>
      <img className="logoSignup" src="../../image/Logo.svg" alt="hows" />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={8}>
          <input
            id="membername"
            name="membername"
            placeholder="이름"
            onChange={handleSignup}
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          {member.memberid.length > 0 && (
            <span className={`message ${isCheckId ? "success" : "error"}`}>
              {idMessage}
            </span>
          )}
          <input
            id="memberid"
            name="memberid"
            placeholder="아이디"
            onChange={handleSignup}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <button onClick={checkId} disabled={isCheckId}>
            중복체크
          </button>
        </Grid>

        <Grid item xs={12} sm={8}>
          <input
            id="pswd"
            name="pswd"
            placeholder="비밀번호"
            onChange={handleSignup}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {member.pswd.length > 0 && (
            <span
              className={`message ${isPasswordConfirm ? "success" : "error"}`}
            >
              {passwordConfirmMessage}
            </span>
          )}
          <input
            id="pswdChk"
            name="pswdChk"
            placeholder="비밀번호 확인"
            type="password"
            onChange={handleSignup}
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          {member.bday !== null && (
            <span className={`message ${isBirth ? "success" : "error"}`}>
              {birthMessage}
            </span>
          )}
          <input
            id="bday"
            name="bday"
            placeholder="생년월일"
            onChange={handleSignup}
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          {member.phone.length > 0 && (
            <span className={`message ${isPhone ? "success" : "error"}`}>
              {phoneMessage}
            </span>
          )}
          <input
            id="phone"
            name="phone"
            placeholder="전화번호"
            onChange={handleSignup}
          />
          <div id="authBox">
            <input
              id="phoneAuth"
              name="phoneAuth"
              placeholder="인증번호"
              onChange={handleAuth}
            />
            <button id="authBtn" onClick={clickAuth} disabled={isCheckPhone}>
              인증
            </button>
          </div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <button onClick={checkPhone} disabled={isCheckPhone}>
            전화번호 인증
          </button>
        </Grid>

        <Grid item xs={12} sm={8}>
          <List
            sx={{
              width: "95%",
              bgcolor: "background.paper",
              fontSize: "10%",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="추가 정보 입력" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span className="addInfoSpan">가입유형</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div className="select">
                      <input
                        type="radio"
                        id="selectUser"
                        name="roles"
                        value="USER"
                        label="roles"
                        onChange={handleSignup}
                      />
                      <label htmlFor="selectUser">일반사용자</label>
                      <input
                        type="radio"
                        id="selectADMIN"
                        name="roles"
                        value="ADMIN"
                        label="roles"
                        onChange={handleSignup}
                      />
                      <label htmlFor="selectADMIN">관리자</label>
                      <input
                        type="radio"
                        id="selectBANKER"
                        name="roles"
                        value="BANKER"
                        label="roles"
                        onChange={handleSignup}
                      />
                      <label htmlFor="selectBANKER">은행원</label>
                    </div>
                  </Grid>
                </ListItem>

                <ListItem sx={{ pl: 2, minHeight: 80 }}>
                  <Grid item xs={12} sm={3}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        은행
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        onChange={bankChange}
                        label="은행명"
                        name="accBank"
                        value={bank}
                      >
                        <MenuItem value={"신한"}>신한</MenuItem>
                        <MenuItem value={"국민"}>국민</MenuItem>
                        <MenuItem value={"우리"}>우리</MenuItem>
                        <MenuItem value={"하나"}>하나</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <input
                      name="accno"
                      placeholder="계좌번호"
                      onChange={handleSignup}
                    />
                  </Grid>
                </ListItem>

                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span className="addInfoSpan">직장유무</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div className="select">
                      <input
                        type="radio"
                        id="select1"
                        name="hasjob"
                        value="1"
                        label="hasjob"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select1">유</label>
                      <input
                        type="radio"
                        id="select2"
                        name="hasjob"
                        value="0"
                        label="hasjob"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select2">무</label>
                    </div>
                  </Grid>
                </ListItem>
                <ListItem sx={{ pl: 2 }}>
                  <Grid item xs={12} sm={8}>
                    <input
                      name="jobname"
                      placeholder="직장명"
                      onChange={handleSignup}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <input
                      name="hiredate"
                      placeholder="입사년도"
                      onChange={handleSignup}
                    />
                  </Grid>
                </ListItem>

                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span className="addInfoSpan">결혼</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div className="select">
                      <input
                        type="radio"
                        id="select3"
                        name="marry"
                        value="0"
                        label="marry"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select3">미혼</label>
                      <input
                        type="radio"
                        id="select4"
                        name="marry"
                        value="1"
                        label="marry"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select4">기혼</label>
                    </div>
                  </Grid>
                </ListItem>

                <ListItem sx={{ pl: 3 }}>
                  <Grid item xs={12} sm={3}>
                    <span className="addInfoSpan">자녀</span>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <div className="select">
                      <input
                        type="radio"
                        id="select5"
                        name="haschild"
                        value="0"
                        label="haschild"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select5">무</label>
                      <input
                        type="radio"
                        id="select6"
                        name="haschild"
                        value="1"
                        label="haschild"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select6">1명</label>
                      <input
                        type="radio"
                        id="select7"
                        name="haschild"
                        value="2"
                        label="haschild"
                        onChange={handleSignup}
                      />
                      <label htmlFor="select7">2명이상</label>
                    </div>
                  </Grid>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Grid>

        <Grid item xs={12} sm={8}>
          <button
            id="signUpBtn"
            onClick={() => signup()}
            disabled={
              !(
                isPhone &&
                isBirth &&
                isPasswordConfirm &&
                isCheckId &&
                isCheckPhone &&
                member.membername !== "" &&
                !member.memberid !== "" &&
                !member.pswd !== ""
              )
            }
          >
            회원가입
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUpForm;
