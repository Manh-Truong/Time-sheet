import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { Alert, Snackbar } from "@mui/material";
import { NativeSelect } from "@mui/material";
import { createTask } from '../../../../redux/actions/taskAction'
import { RootState } from "../../../../redux/store";
import { resetProgress } from '../../../../redux/reducers/taskReducer'
import { ITaskRequest } from '../../../../api/task/type'


const TitleHeader = styled.div`
  font-family: Roboto, "Helvetica Neue", sans-serif;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.87);
  cursor: grab;
  margin-top: 22px;
`;

const NewTask = styled.div`
  display: flex;
  gap: 250px;
`;

const ButtonEdit = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 55px;
`;

const InputName = styled(TextField)``;

interface INewTask {
  id: number;
  name: string;
  type: string;
}

const EditTasks: React.FC<{ task: ITaskRequest }> = ({ task }) => {
  const { reset, control, handleSubmit } = useForm<INewTask>({
    defaultValues: { id: task.id, name: task.name, type: task.type.toString() },
  });

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const progress = useSelector((state: RootState) => state.task.progress);

  const handleOpenSnackbar = () => {
    setOpen(false);
    setOpenSnackbar(true);
  };

  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
  };

  const handleOpen = () => {
    setOpen(true);
    reset({
      id: task.id,
      name: task.name,
      type: task.type.toString() as string,
    });
  };
  const handleClose = () => setOpen(false);

  const handleEdit = async (props: INewTask) => {
    dispatch(
      createTask({
        id: props.id,
        name: props.name,
        type: +props.type,
      })
    );
  };

  useEffect(() => {
    if (progress === "done" && open) {
      dispatch(resetProgress());
      setOpen(false);
      handleOpenSnackbar()
    }
  }, [progress, open, dispatch]);

  return (
    <NewTask>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={handleSnackBarClose}
        >
          Edit {task.name} Success
        </Alert>
      </Snackbar>
      <Button
        style={{ background: "#fff", 
                 height: "40px", 
                 color: "rgba(0, 0, 0, 0.87)", 
                 textTransform: 'capitalize' 
                }}
        variant="contained"
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 260,
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
            borderRadius: 1
          }}
        >
          <form onSubmit={handleSubmit(handleEdit)}>
            <TitleHeader>Edit Task: {task.name} </TitleHeader>
            <Controller
              name="name"
              render={({ field }) => {
                return (
                  <InputName
                    label="Name *"
                    variant="standard"
                    color="error"
                    {...field}
                    style={{ width: "100%", marginTop: '15px', marginBottom: '20px'}}
                  />
                );
              }}
              control={control}
              defaultValue=""
            />

            <Box sx={{color: "gray", fontSize: 13}}>Task type</Box>
            <Controller
              name="type"
              render={({ field }) => (
                <NativeSelect {...field} 
                  color="error"
                  style={{ width: "100%", fontSize: '14px'}}>
                  <option value={0}>Common Task</option>
                  <option value={1}>Other Task</option>
                </NativeSelect>
              )}
              control={control}
              defaultValue=""
            />
            <ButtonEdit>
              <Button
                variant="outlined"
                color="error"
                sx={{ color: "rgb(51, 51, 51)", 
                      background: "#fff", 
                      border: 'none', 
                      textTransform: 'capitalize', 
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      fontSize: 13,
                      ":hover":{
                        background: "#fff", 
                        border: 'none'
                      }
                    }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ background: "#f24b50", 
                      color: "rgba(0, 0, 0, 0.26)", 
                      textTransform: 'capitalize', 
                      fontSize: 13,
                      ":hover":{
                        background: "#f24b50", 
                        border: "none"    
                      }
                    }}
              >
                Save
              </Button>
            </ButtonEdit>
          </form>
        </Box>
      </Modal>
    </NewTask>
  );
};

export default EditTasks;