import React from "react";
import "../../css/my/MyPage.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
function MyPage(props) {
  return (
    <div className="myPage">
      <div className="myContainer">
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            height={"auto"}
            events={[
              {
                title: "event 1",
                start: "2023-06-13",
                end: "2023-06-16",
                backgroundColor: "#031389",
                borderColor: "#031389",
                textColor: "white",
              },
              {
                title: "event 2",
                start: "2023-06-22",
                end: "2023-06-24",
                backgroundColor: "#FFFEDD",
                borderColor: "#FFFEDD",
                textColor: "black",
              },
              {
                title: "event 3",
                start: "2023-06-26",
                end: "2023-06-28",
                backgroundColor: "#609966",
                borderColor: "#609966",
                textColor: "white",
              },
            ]}
          />
        </div>
        <div className="myLoan">내 대출 목록</div>
        <div className="myAcc">내 연결 계좌</div>
        <div className="myEdit">회원정보 수정</div>
      </div>
    </div>
  );
}

export default MyPage;
