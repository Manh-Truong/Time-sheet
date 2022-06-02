import React, { useState } from "react";
import { Button, MenuItem, Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";
import { SnackbarProvider} from "notistack";
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

const StyleButton = styled.div`
  display: flex;
  gap: 15px;
`;

const ActionActive: React.FC<{ project: IProjectReq }> = ({ project }) => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {project.status === 0 ? (
        <>
          <MenuItem
            disableRipple
            onClick={handleOpen}
            style={{ fontSize: "15px" }}
          >
            <ClearIcon />
            Deactive
          </MenuItem>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Form>
                <ErrorOutlineIcon
                  sx={{ color: "#f8bb86", fontSize: "100px" }}
                />
                <TextTitle>Are you sure?</TextTitle>
                <TextName>
                  DeActive project : '{project.name}' ?
                </TextName>
                <StyleButton>
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
                </StyleButton>
              </Form>
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <MenuItem disableRipple onClick={handleOpen}>
            <CheckIcon />
            Active
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
                  Active project : '{project.name}' ?
                </TextName>
                <StyleButton>
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
                </StyleButton>
              </Form>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

const ActiveAndInactive: React.FC<{ project: IProjectReq }> = ({ project }) => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
      <ActionActive project={project} />
    </SnackbarProvider>
  );
};

export default ActiveAndInactive;