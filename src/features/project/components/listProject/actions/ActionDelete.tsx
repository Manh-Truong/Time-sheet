import React, {useState } from "react";
import { Button, MenuItem, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { IProjectReq } from "../../../../../api/project/type";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  p: 4,
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
  font-weight: 400
  margin-bottom: 15px;
  padding-bottom: 20px;
  color: rgba(0, 0, 0, 0.64);
`;

const ButtonDelete = styled.div`
  display: flex;
  gap: 15px;
`;

const DeleteProject: React.FC<{ project: IProjectReq }> = ({ project }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <MenuItem
        disableRipple
        onClick={handleOpen}
        style={{ color: "rgb(169, 68, 66)", fontSize: "15px" }}
      >
        <DeleteIcon />
        <p>Delete</p>
      </MenuItem>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form>
            <ErrorOutlineIcon
              sx={{ width: "100px", height: "100px", color: "#f8bb86" }}
            />
            <TextTitle>Are you sure?</TextTitle>
            <TextName>
              Delete project :  ?
            </TextName>
            <ButtonDelete>
              <Button
                variant="outlined"
                sx={{
                  color: "#555",
                  fontWeight: 600,
                  border: "none",
                  outline: "none",
                  textTransform: "capitalize",
                  backgroundColor: "rgb(239, 239, 239)",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  background: "#7cd1f9",
                  border: "none",
                  outline: "none",
                  textTransform: "capitalize",
                }}
              >
                Yes
              </Button>
            </ButtonDelete>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteProject;