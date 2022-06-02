import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { Alert, NativeSelect, Snackbar } from "@mui/material";
import { RootState } from "../../../../redux/store";
import { resetProgress } from '../../../../redux/reducers/taskReducer'
import { createTask } from '../../../../redux/actions/taskAction'

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

const ButtonNew = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 55px;
`;

const InputName = styled(TextField)``;

interface INewTask {
  name: string;
  type: string;
}

const CreateTasks: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<INewTask>();
  const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.task.progress);
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpenSnackbar = () => {
    setOpen(false);
    setOpenSnackbar(true);
  };
  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
  };

  const handleCreate = async (props: INewTask) => {
    dispatch(
      createTask({
        name: props.name,
        type: +props.type,
      })
    );
    reset({
      name: "",
      type: "",
    });
  };

  useEffect(() => {
    if (progress === "done" && open) {
      dispatch(resetProgress());
      setOpen(false);
      handleOpenSnackbar();
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
          Create Task Success
        </Alert>
      </Snackbar>
      <Button
        style={{
          background: "#f24b50", 
          height: "35px", 
          textTransform: 'capitalize',
          boxShadow: 'box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px',
          marginTop: '15px'
        }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New Task
      </Button>
      <Modal
        open={open}
      >
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

          <form onSubmit={handleSubmit(handleCreate)}>
            <TitleHeader>New Task</TitleHeader>
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
                    InputLabelProps={{ style: { fontSize: 14 } }}
                  />
                );
              }}
              control={control}
              defaultValue=""
            />
            
            <Box sx={{color: "gray", fontSize: 13}}>Task type</Box>
            <Controller
              name="type"
              render={({ field }) => {
                return (
                <NativeSelect {...field} 
                  color="error"
                  style={{ width: "100%", fontSize: '14px'}}>
                  <option value={0}>Common Task</option>
                  <option value={1}>Other Task</option>
                </NativeSelect>
                );
              }}
              control={control}
              defaultValue=""
            />
            <ButtonNew>
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
            </ButtonNew>
          </form>
        </Box>
      </Modal>
    </NewTask>
  );
};

export default CreateTasks;