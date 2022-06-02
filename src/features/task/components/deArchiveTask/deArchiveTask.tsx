import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { deArchiveTask } from '../../../../redux/actions/taskAction'
import { ITaskRequest } from '../../../../api/task/type'
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const style = {
  position: "absolute" as "absolute",
  width: 400,
  top: "50%",
  left: "50%",
  p: 4,
  borderRadius: "10px",
  transform: "translate(-50%, -50%)",
  background: "#fff"
};

const Form = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TextTitle = styled.div`
  font-family: Roboto, Arial, Tahoma, sans-serif;
  font-size: 27px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  padding-top: 17px;
  margin-bottom: 15px;
`;

const TextName = styled.div`
  font-family: Roboto, Arial, Tahoma, sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 20px;
  color: rgba(0, 0, 0, 0.64);
`;

const DeArchiveButton = styled.div`
  display: flex;
  gap: 10px;
`;

const DeArchiveTask: React.FC<{ task: ITaskRequest }> = ({ task }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const onDeArchive = async (id: number) => {
    dispatch(deArchiveTask({ id }));
    handleClose();
  };

  return (
    <div>
      <Button
        defaultValue={task.id}
        style={{
          marginRight: "10px",
          background: "#FFFFFF",
          color: "black",
          textTransform: "none",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Unarchive
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form>
            <ErrorOutlineIcon
              sx={{ width: "100px", height: "100px", color: "#f8bb86" }}
            />
            <TextTitle>Are you sure?</TextTitle>
            <TextName>Unarchive task : {task.name} ?</TextName>
            <DeArchiveButton>
              <Button
                variant="outlined"
                sx={{ color: "#555", 
                      fontWeight: 600, 
                      backgroundColor: 'rgb(239, 239, 239)',
                      border: 'none', 
                      outline: 'none', 
                      textTransform: 'capitalize',
                      ":hover":{
                        backgroundColor: "rgb(239, 239, 239)", 
                        border: 'none'
                      }
                    }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "white", 
                      background: "#7cd1f9", 
                      border: 'none', 
                      outline: 'none', 
                      textTransform: 'capitalize',
                      ":hover":{
                        background: "#7cd1f9", 
                        border: 'none'
                      } 
                    }}
                onClick={() => {
                  onDeArchive(task.id);
                }}
              >
                Yes
              </Button>
            </DeArchiveButton>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default DeArchiveTask;
