import { file } from "@babel/types";
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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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
    email: "",
  };

  const [member, setMember] = useState(memberInit);

  const [files, setFiles] = useState("");

  const handleFile = (e) => {
    setFiles(e.target.files);
  };

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
  const [isCheckPhone, setIsCheckPhone] = useState(0); //0: 인증 진행중, 1: 인증 실패, 2: 인증 성공
  const [authMessage, setAuthMessage] = useState("인증번호 발송 완료");
  const handleAuth = (e) => {
    setAuthInput(e.target.value);
  };

  //이메일 인증 여부 확인
  const [emailAns, setEmailAns] = useState(""); //인증번호
  const [emailInput, setEmailInput] = useState(""); //사용자가 입력한 인증번호
  const [isCheckEmail, setIsCheckEmail] = useState(0); //0: 인증 진행중, 1: 인증 실패, 2: 인증 성공
  const [emailMessage, setEmailMessage] =
    useState("회사 이메일을 인증해주세요");
  const handleEmail = (e) => {
    setEmailInput(e.target.value);
  };

  //input창에 입력 시 처리(+유효성 검사)
  const handleSignup = (e) => {
    if (e.target.name === "fileUpload") {
      setMember({ ...member, [e.target.name]: e.target.files });
    } else if (e.target.name !== "pswdChk") {
      setMember({ ...member, [e.target.name]: e.target.value });
    }
    if (e.target.name === "memberid") {
      setIsCheckId(false);
    } else if (e.target.name === "phone") {
      var btn = document.getElementById("authPhoneBtn");
      if (e.target.value.length > 0) {
        btn.style.marginTop = "20px";
      } else {
        btn.style.marginTop = "0px";
      }
      //자동 하이픈 추가
      let phoneAuto = e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "");

      //정규식 판단
      const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
      if (!phoneRegex.test(phoneAuto)) {
        setPhoneMessage("전화번호 형식이 틀렸어요 010-0000-0000");
        setIsPhone(false);
      } else {
        setPhoneMessage("올바른 전화번호 형식이에요 : )");
        setIsPhone(true);
      }
      document.getElementById("phone").value = phoneAuto;
      setMember({ ...member, [e.target.name]: phoneAuto });
    } else if (e.target.name === "bday") {
      //자동 하이픈 추가
      let birthAuto = e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "");

      //정규식 판단
      const birthRegex =
        /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (!birthRegex.test(birthAuto)) {
        setBirthMessage("생년월일 형식이 틀렸어요 1900-01-01");
        setIsBirth(false);
      } else {
        setBirthMessage("올바른 생년월일 형식이에요 : )");
        setIsBirth(true);
      }
      document.getElementById("bday").value = birthAuto;
      setMember({ ...member, [e.target.name]: birthAuto });
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
  const checkId = () => {
    const url = "/hows/auth/checkDuplicateId";
    axios
      .get(url, {
        params: {
          memberid: member.memberid,
        },
      })
      .then((res) => {
        if (res.data === "사용가능한아이디입니다.") {
          setIsCheckId(true);
          setIdMessage("사용 가능한 아이디");
        } else {
          setIsCheckId(false);
          setIdMessage("사용 불가한 아이디");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //전화번호 인증
  const checkPhone = (event) => {
    //난수 받아와서 사용자 입력과 같은지 비교
    if (!isPhone) {
      confirmAlert({
        title: "전화번호를 입력해주세요",
        message: "",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
            style: { backgroundColor: "#518e65" },
          },
        ],
      });
    } else {
      var authbox = document.getElementById("authBox");
      authbox.style.display = "block";
      const url = "/hows/auth/send";
      const number = member.phone.replaceAll("-", "");
      axios
        .post(url, null, {
          params: {
            tel: number,
          },
        })
        .then((res) => {
          setAuthAns(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  //전화번호 인증번호 확인
  const clickAuth = () => {
    if (authInput == authAns) {
      setIsCheckPhone(2);
      setAuthMessage("전화번호 인증 성공");
    } else {
      setIsCheckPhone(1);
      setAuthMessage("전화번호 인증 실패");
    }
  };

  //이메일 인증
  const checkEmail = (event) => {
    //난수 받아와서 사용자 입력과 같은지 비교
    if (!isCheckEmail) {
      confirmAlert({
        title: "이메일을 입력해주세요",
        message: "",
        buttons: [
          {
            label: "확인",
            onClick: () => {},
            style: { backgroundColor: "#518e65" },
          },
        ],
      });
    } else {
      var authbox = document.getElementById("authBox");
      authbox.style.display = "block";
      const url = "/member/send";
      const email = member.email.replaceAll("-", "");
      axios
        .post(url, null, {
          params: {
            tel: email,
          },
        })
        .then((res) => {
          setEmailAns(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  //이메일 인증번호 확인
  const clickEmail = () => {
    if (emailInput == emailAns) {
      setIsCheckEmail(2);
      setEmailMessage("이메일 인증 성공");
    } else {
      setIsCheckEmail(1);
      setEmailMessage("이메일 인증 실패");
    }
  };

  //재직 증명서 제출
  function submitWork() {
    const url = "/hows/loan/detail/workdocs/" + member.memberid;
    const formData = new FormData();
    formData.append("file", files);

    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data === "success") {
          confirmAlert({
            title: "회원가입 성공",
            message: "로그인해주세요",
            buttons: [
              {
                label: "확인",
                onClick: () => {
                  window.location.href = "/hows/auth/login";
                },
                style: { backgroundColor: "#518e65" },
              },
            ],
          });
        } else {
          confirmAlert({
            title: "회원가입 실패",
            message: "다시 시도해주세요",
            buttons: [
              {
                label: "확인",
                onClick: () => {},
                style: { backgroundColor: "#518e65" },
              },
            ],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //회원가입
  function signup() {
    const url = "/hows/auth/signup";

    axios
      .post(url, JSON.stringify(member), {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        if (res.data === "success.") {
          if (member.roles !== "USER") {
            submitWork();
          } else {
            confirmAlert({
              title: "회원가입 성공",
              message: "로그인해주세요",
              buttons: [
                {
                  label: "확인",
                  onClick: () => {
                    window.location.href = "/hows/auth/login";
                  },
                  style: { backgroundColor: "#518e65" },
                },
              ],
            });
          }
        } else {
          confirmAlert({
            title: "회원가입 실패",
            message: "다시 시도해주세요",
            buttons: [
              {
                label: "확인",
                onClick: () => {},
                style: { backgroundColor: "#518e65" },
              },
            ],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //재직증명서 파일 업로드
  const [fileName, setFileName] = useState("");

  const printFileName = (e) => {
    //파일 확장자 관리
    const fileType = e.target.value.split(".").pop();
    if (
      !["jpeg", "png", "jpg", "JPG", "PNG", "JPEG", "pdf", "PDF"].includes(
        fileType
      )
    ) {
      alert("jpg, png, jpg, pdf 파일만 업로드가 가능합니다.");
      return;
    }

    //setMember({ ...member, file: e.target.file });
    setFiles(e.target.files[0]);
    var filename = e.target.value; // 파일 주소

    // 파일 이름만 분리 출력
    var filename_list = filename.split("\\");
    filename = filename_list.slice(-1);
    setFileName(filename);
  };

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
          <button className="signupBtn" onClick={checkId} disabled={isCheckId}>
            중복체크
          </button>
        </Grid>

        <Grid item xs={12} sm={8}>
          <input
            id="pswd"
            name="pswd"
            type="password"
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

        <Grid item xs={12} sm={8} className="">
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
            {member.phone.length > 0 && (
              <span
                className={`message ${isCheckPhone >= 2 ? "success" : "error"}`}
              >
                {authMessage}
              </span>
            )}
            <div style={{ display: "flex" }}>
              <input
                id="phoneAuth"
                name="phoneAuth"
                placeholder="인증번호"
                onChange={handleAuth}
              />

              <button
                id="authBtn"
                className="signupBtn"
                onClick={clickAuth}
                disabled={isCheckPhone >= 2 ? true : false}
              >
                인증
              </button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <button
            id="authPhoneBtn"
            className="signupBtn"
            onClick={checkPhone}
            disabled={isCheckPhone}
          >
            전화번호 인증
          </button>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <div className="select">
            <span>가입유형</span>
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
              id="selectAdmin"
              name="roles"
              value="ADMIN"
              label="roles"
              onChange={handleSignup}
            />
            <label htmlFor="selectAdmin">관리자</label>
            <input
              type="radio"
              id="selectBanker"
              name="roles"
              value="BANKER"
              label="roles"
              onChange={handleSignup}
            />
            <label htmlFor="selectBanker">은행원</label>
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div
            id="authBox"
            style={{
              width: "95%",
              display: member.roles === "USER" ? "none" : "flex",
            }}
          >
            <input
              id="email"
              name="email"
              placeholder="회사 이메일"
              onChange={handleSignup}
            />
            <button
              className="signupBtn"
              onClick={checkEmail}
              disabled={isCheckEmail}
            >
              인증메일 발송
            </button>
          </div>
          <div
            id="authBox"
            style={{
              width: "95%",
              display: member.roles === "USER" ? "none" : "flex",
            }}
          >
            <div
              style={{ width: "90%", display: "flex", flexDirection: "column" }}
            >
              {member.roles !== "USER" > 0 && (
                <span
                  className={`message ${
                    isCheckEmail >= 2 ? "success" : "error"
                  }`}
                >
                  {emailMessage}
                </span>
              )}
              <input
                id="emailAuth"
                name="emailAuth"
                placeholder="인증번호"
                onChange={handleEmail}
              />
            </div>
            <button
              id="emailBtn"
              className="signupBtn"
              onClick={clickEmail}
              disabled={isCheckEmail >= 2 ? true : false}
            >
              인증
            </button>
          </div>
          <div
            id="authBox"
            style={{
              width: "95%",
              display: member.roles === "USER" ? "none" : "flex",
            }}
          >
            <input
              defaultValue={fileName}
              placeholder="재직증명서 첨부파일"
              name="file"
              className="fileInput"
            ></input>
            <label for="fileUpload" className="uploadBtn">
              업로드
            </label>
            <input
              type="file"
              id="fileUpload"
              name="fileUpload"
              onChange={printFileName}
            />
          </div>
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
                <ListItem sx={{ pl: 2, minHeight: 80 }}>
                  <Grid item xs={12} sm={3}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        은행
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        name="accBank"
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
            className="signupBtn"
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
