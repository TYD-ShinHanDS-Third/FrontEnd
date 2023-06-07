import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

function BankManageApplyLoan(props) {
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
              <TableCell className="userlist_header">대출 신청 상품</TableCell>
              <TableCell className="userlist_header">대출 신청 상태</TableCell>
              <TableCell className="userlist_header">서류 검토</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>회원 아이디123</TableCell>
              <TableCell>회원 이름123</TableCell>
              <TableCell>대출 신청 상품123</TableCell>
              <TableCell>대출 신청 상태123</TableCell>
              <TableCell>
                <Link
                  to="/hows/bank/loanlist/detail"
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    color: "green"
                  }}
                >
                  서류 제출여부123
                </Link>
              </TableCell>
            </TableRow>

            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>회원 아이디123</TableCell>
              <TableCell>회원 이름123</TableCell>
              <TableCell>대출 신청 상품123</TableCell>
              <TableCell>대출 신청 상태123</TableCell>
              <TableCell>
                {" "}
                <Link
                  to="/hows/bank/loanlist/detail"
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    color: "green"
                  }}
                >
                  서류 제출여부123
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BankManageApplyLoan;
