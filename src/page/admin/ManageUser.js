import React, { useState } from "react";
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

function ManageUser(props) {
  const [role, setRole] = useState(""); // 나중엔 객체로 해서 각자 사용이 가능하게 해야될듯하
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <div className="manageuser">
      <div className="man_userlist">
        <TableContainer>
          <Table
            sx={{ minWidth: 500 }}
            size="small"
            aria-label="a dense table"
            style={{ textAlign: "center" }}
          >
            <TableHead>
              <TableRow>
                <TableCell className="userlist_header">User number</TableCell>
                <TableCell className="userlist_header">user name</TableCell>
                <TableCell className="userlist_header">user email</TableCell>
                <TableCell className="userlist_header">user Birthday</TableCell>
                <TableCell className="userlist_header">ROLE</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>User number</TableCell>
                <TableCell>user name</TableCell>
                <TableCell>user email</TableCell>
                <TableCell>user Birthday</TableCell>
                <TableCell>
                  {" "}
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={role}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"USER"}>USER</MenuItem>
                      <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                      <MenuItem value={"BANK"}>BANK</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>User number2</TableCell>
                <TableCell>user name2</TableCell>
                <TableCell>user email2</TableCell>
                <TableCell>user Birthday2</TableCell>
                <TableCell>
                  {" "}
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={role}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"USER"}>USER</MenuItem>
                      <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                      <MenuItem value={"BANK"}>BANK</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>User number3</TableCell>
                <TableCell>user name3</TableCell>
                <TableCell>user email3</TableCell>
                <TableCell>user Birthday3</TableCell>
                <TableCell>
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={role}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"USER"}>USER</MenuItem>
                      <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                      <MenuItem value={"BANK"}>BANK</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>User number4</TableCell>
                <TableCell>user name4</TableCell>
                <TableCell>user email4</TableCell>
                <TableCell>user Birthday4</TableCell>
                <TableCell>
                  {" "}
                  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={role}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"USER"}>USER</MenuItem>
                      <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                      <MenuItem value={"BANK"}>BANK</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ManageUser;
