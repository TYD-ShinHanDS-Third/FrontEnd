import React from "react";
import "../../css/SignUp.css";

function SignUp(props) {
  const checkId = (event) => {
    //
  };
  const checkPhone = (event) => {
    //
  };
  return (
    <div>
      <div className="circle"></div>
      <div className="front">
        <img className="logo" src="image/Logo.svg" width="100px" />
        <form>
          <input name="memberName" placeholder="이름" />
          <br />
          <input name="memberId" placeholder="아이디" />
          <button onClick={checkId}>중복체크</button>
          <br />
          <input name="pswd" placeholder="비밀번호" />
          <br />
          <input name="pswdChk" placeholder="비밀번호 확인" />
          <span>확인</span>
          <br />
          <input name="bDay" placeholder="생년월일" />
          <br />
          <input name="Phone" placeholder="전화번호" />
          <button onClick={checkPhone}>전화번호 인증</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
