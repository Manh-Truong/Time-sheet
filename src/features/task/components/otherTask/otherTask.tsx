import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Alert, Snackbar } from "@mui/material";
import {
  resetProgress,
  taskSelector,
} from '../../../../redux/reducers/taskReducer'
import EditTasks from "../editTask/editTask";
import { RootState } from "../../../../redux/store";
import DeleteTask from "../deleteTask/deleteTask";

const Title = styled.div`
font-size: 14px;
font-weight: 400;
color: rgb(85, 85, 85);
line-height: 30px;
font-weight: 700
`;

const TitleContent = styled.div`
font-size: 14px;
color: rgb(85, 85, 85);
padding:10px 0px
`;

const Other = styled.div`
  padding: 10px 25px;
  gap: 50px;
  color: rgb(85, 85, 85);
  font-family: Roboto, Arial, Tahoma, sans-serif
`;

const TitleName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgb(85, 85, 85);
  line-height: 30px;
  font-weight: 700;
  border-bottom:1px solid rgb(238, 238, 238);
  border-top:1px solid rgb(238, 238, 238);
  padding: 5px 0px
`;

const TableCommon = styled.div``;

const OtherTask: React.FC = () => {
  const message = useSelector((state: RootState) => state.task.error.message);
  const searchName = useSelector((state: RootState) => state.task.searchName);
  const otherTasks = useSelector(taskSelector.getOtherTaskSelector);
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (message === "") {
      handleSnackBarClose();
      dispatch(resetProgress());
    } else {
      handleOpenSnackbar();
    }
  }, [message, dispatch]);

  return (
    <Other>
      <Title>Other Task ({otherTasks && otherTasks.length})</Title>
      <TitleContent>These task must be manually added to projects</TitleContent>
      <TableCommon>
        <TitleName>Name</TitleName>

        {otherTasks && otherTasks
          .filter((item) => item.name.toLowerCase().includes(searchName))
          .map((item, index) => {
            return (
              <Table
                aria-label="simple table"
                sx={{ border: 1, color: "#e9e9e9" }}
                key={index}
              >
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell scope="row" sx={{ width: "5px", padding: "5px 5px" }}>
                      <EditTasks task={item} />
                    </TableCell>
                    <TableCell scope="row" sx={{ color: 'rgb(85, 85, 85)' }}>{item.name}</TableCell>
                    <TableCell
                      align="right" sx={{ width: "5px", padding: "5px 5px" }}
                    >
                      <Snackbar
                        open={openSnackbar}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        autoHideDuration={2000}
                        onClose={handleSnackBarClose}
                      >
                        <Alert
                          variant="filled"
                          severity="error"
                          onClose={handleSnackBarClose}
                        >
                          Delete {message} error
                        </Alert>
                      </Snackbar>
                      <DeleteTask task={item} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          })}
      </TableCommon>
    </Other >
  );
};

export default OtherTask;