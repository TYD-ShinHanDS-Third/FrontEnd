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

function ConsultingList() {
  const [userConList, setUserConsultList] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    userCList();
  }, []);

  //회원 상담  - 조회
  async function userCList() {
    const cookies = new Cookies();
    const token = cookies.get("jwtToken");

    const listurl = "/hows/admin/consult";

    await axios
      .get(listurl, {
        params: {
          page: pageNum,
          size: "9",
        },
        headers: {
          "Content-type": "application/json",
          token: token,
        },
      })
      .then(function (response) {
        setUserConsultList(response.data);
        setPageTotal(response.data.total);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  console.log(userConList);
  return (
    <div className="manageuser">
      <TableContainer className="man_userlist">
        <Table
          sx={{ minWidth: 500 }}
          size="small"
          aria-label="a dense table"
          style={{ textAlign: "center" }}
        >
          <TableHead>
            <TableRow>
              <TableCell className="userlist_header">회원 아이디</TableCell>
              <TableCell className="userlist_header">회원 이름</TableCell>
              <TableCell className="userlist_header">상담 신청 상품</TableCell>
              <TableCell className="userlist_header">대출 신청 상태</TableCell>
              <TableCell className="userlist_header"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userConList.map((item, index) => {
              return (
                <TableRow
                  key={item.memberid.memberid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell name="memberid">
                    {item.memberid.memberid}
                  </TableCell>
                  <TableCell name="membername">{item.membername}</TableCell>
                  <TableCell name="loanname">
                    {item.loanname.loanname}
                  </TableCell>
                  <TableCell name="loanstate">{item.loanstate}</TableCell>
                  <Link
                    to="/hows/admin/consult/chatroom"
                    style={{ textDecoration: "none" }}
                  >
                    <TableCell style={{ color: "green" }}>
                      상담방 입장
                    </TableCell>
                  </Link>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ConsultingList;
