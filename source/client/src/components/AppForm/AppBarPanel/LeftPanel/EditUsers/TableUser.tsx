import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { Box, Typography } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { observer } from "mobx-react";

import { EditUser } from "./EditUser";

import { APP_STORAGE } from "../../../../../storage/AppStorage";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

interface IProps {}

//ToDo: компонент не используется - удалить
@observer
export class TableUser extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  async OpenSearch() {
    if (APP_STORAGE.edit_user.getOpenSearch() === false) {
      APP_STORAGE.edit_user.setOpenSearch(true);
    } else {
      APP_STORAGE.edit_user.setOpenSearch(false);
    }
  }

  async SeachFamily(a: any) {
    APP_STORAGE.edit_user.setSearchFamaly(a);
    let filter = (
      document.getElementById("search") as HTMLInputElement
    ).value.toUpperCase();
    let table = document.getElementById("myTable") as HTMLInputElement;
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  async SeachName(a: any) {
    APP_STORAGE.edit_user.setSearchName(a);
    let filter = (
      document.getElementById("search_name") as HTMLInputElement
    ).value.toUpperCase();
    let table = document.getElementById("myTable") as HTMLInputElement;
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  async SeachFather(a: any) {
    APP_STORAGE.edit_user.setSearchFather(a);
    let filter = (
      document.getElementById("search_father") as HTMLInputElement
    ).value.toUpperCase();
    let table = document.getElementById("myTable") as HTMLInputElement;
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[3];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  async SeachLogin(a: any) {
    APP_STORAGE.edit_user.setSearchLogin(a);
    let filter = (
      document.getElementById("search_login") as HTMLInputElement
    ).value.toUpperCase();
    let table = document.getElementById("myTable") as HTMLInputElement;
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  async SeachTelephone(a: any) {
    APP_STORAGE.edit_user.setSearchTelephone(a);
    let filter = (
      document.getElementById("search_telephone") as HTMLInputElement
    ).value.toUpperCase();
    let table = document.getElementById("myTable") as HTMLInputElement;
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[5];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  async SeachEmail(a: any) {
    APP_STORAGE.edit_user.setSearchEmail(a);
    let filter = (
      document.getElementById("search_email") as HTMLInputElement
    ).value.toUpperCase();
    let table = document.getElementById("myTable") as HTMLInputElement;
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[6];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  render(): React.ReactNode {
    let rows_search: React.ReactNode = <></>;
    let table_rows = [];
    if (APP_STORAGE.reg_user.getAllUsers()) {
      let users = JSON.parse(
        JSON.stringify(APP_STORAGE.reg_user.getAllUsers())
      );
      for (var key in users) {
        let row = users[key];
        if (row.u_deleted === false) {
          table_rows.push(
            <TableRow
              key={row.u_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{key}</TableCell>
              <TableCell align="center"> {row.u_family}</TableCell>
              <TableCell align="center"> {row.u_name} </TableCell>
              <TableCell align="center">{row.u_father}</TableCell>
              <TableCell align="center">{row.u_login}</TableCell>
              <TableCell align="center">{row.u_telephone}</TableCell>
              <TableCell align="center">{row.u_email}</TableCell>
              <TableCell align="center">{row.u_info}</TableCell>
              <TableCell
                align="center"
                onClick={(e) => {
                  APP_STORAGE.edit_user.set_IdRows(row.u_id);
                }}
              >
                <DriveFileRenameOutlineOutlinedIcon fontSize="small" />
              </TableCell>
              <TableCell align="center">Действующая</TableCell>
            </TableRow>
          );
        } else {
          table_rows.push(
            <TableRow
              key={row.u_id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                background: "#b9b3b31f",
              }}
            >
              <TableCell align="center">{key}</TableCell>
              <TableCell sx={{ color: "#E31450" }} align="center">
                {" "}
                {row.u_family}{" "}
              </TableCell>
              <TableCell sx={{ color: "#E31450" }} align="center">
                {" "}
                {row.u_name}{" "}
              </TableCell>
              <TableCell sx={{ color: "#E31450" }} align="center">
                {row.u_father}
              </TableCell>
              <TableCell sx={{ color: "#E31450" }} align="center">
                {row.u_login}
              </TableCell>
              <TableCell sx={{ color: "#E31450" }} align="center">
                {row.u_telephone}
              </TableCell>
              <TableCell sx={{ color: "#E31450" }} align="center">
                {row.u_email}
              </TableCell>
              <TableCell sx={{ color: "#E31450" }} align="center">
                {row.u_info}
              </TableCell>
              <TableCell
                align="center"
                onClick={(e) => {
                  APP_STORAGE.edit_user.set_IdRows(row.u_id);
                }}
              >
                <DriveFileRenameOutlineOutlinedIcon fontSize="small" />
              </TableCell>
              <TableCell sx={{ color: "#E31450" }} align="center">
                Закрытая
              </TableCell>
            </TableRow>
          );
        }
      }
    }

    if (APP_STORAGE.edit_user.getOpenSearch() === true) {
      rows_search = (
        <TableRow>
          <TableCell> </TableCell>
          <TableCell align="center">
            <TextField
              variant="standard"
              size="small"
              id="search"
              onChange={(e) => {
                this.SeachFamily(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getSearchFamaly()}
            />
          </TableCell>

          <TableCell align="center">
            <TextField
              variant="standard"
              size="small"
              id="search_name"
              onChange={(e) => {
                this.SeachName(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getSearchName()}
            />
          </TableCell>

          <TableCell align="center">
            <TextField
              variant="standard"
              size="small"
              id="search_father"
              onChange={(e) => {
                this.SeachFather(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getSearchFather()}
            />
          </TableCell>

          <TableCell align="center">
            <TextField
              variant="standard"
              size="small"
              id="search_login"
              onChange={(e) => {
                this.SeachLogin(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getSearchLogin()}
            />
          </TableCell>

          <TableCell align="center">
            <TextField
              variant="standard"
              size="small"
              id="search_telephone"
              onChange={(e) => {
                this.SeachTelephone(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getSearchTelephone()}
            />
          </TableCell>

          <TableCell align="center">
            <TextField
              size="small"
              variant="standard"
              id="search_email"
              onChange={(e) => {
                this.SeachEmail(e.target.value);
              }}
              value={APP_STORAGE.edit_user.getSearchEmail()}
            />
          </TableCell>

          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      );
    } else {
      rows_search = <></>;
    }

    return (
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column;",
            alignItems: "flex-start;",
          }}
        >
          <TableContainer component={Paper}>
            <Table id="myTable" aria-label="simple table">
              <TableHead>
                <TableRow key={110}>
                  <TableCell
                    align="center"
                    width={1}
                    onClick={(e) => {
                      this.OpenSearch();
                    }}
                  >
                    {" "}
                    <SearchOutlinedIcon />{" "}
                  </TableCell>
                  <TableCell align="center">Фамилия</TableCell>
                  <TableCell align="center">Имя</TableCell>
                  <TableCell align="center">Отчество</TableCell>
                  <TableCell align="center">Логин</TableCell>
                  <TableCell align="center">Телефон</TableCell>
                  <TableCell align="center">Почта</TableCell>
                  <TableCell align="center">Информация</TableCell>
                  <TableCell align="center">Редактировать</TableCell>
                  <TableCell align="center">Состояние</TableCell>
                </TableRow>

                {rows_search}
              </TableHead>
              <TableBody>{table_rows}</TableBody>
            </Table>
          </TableContainer>

          <EditUser />
        </Box>
      </React.Fragment>
    );
  }
}
