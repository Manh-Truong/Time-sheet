import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { createCustomer } from "../../../../../../../redux/actions/projectAction";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { RootState } from "../../../../../../../redux/store";
import { resetProgress } from "../../../../../../../redux/reducers/projectReducer";
import { Alert, Snackbar } from "@mui/material";
import { ICustomerReq } from "../../../../../../../api/task/type";

const Wrapper = styled.div`
  padding-left: 50px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const TitleClient = styled.div`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.87);
  cursor: grab;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  padding-top: 15px;
`;
const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyleButton = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
  gap: 15px;
`;
interface INewCustomer {
  name: string;
  address: string;
}

const CreateClient: React.FC = () => {
  const { reset, control, handleSubmit } = useForm<INewCustomer>();
  const dispatch = useDispatch();
  const handleCreate = async (props: ICustomerReq) => {
    dispatch(
      createCustomer({
        name: props.name,
        address: props.address,
      })
    );
    reset({
      name: "",
      address: "",
    });
  };
  const [open, setOpen] = React.useState(false);
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

  const progress = useSelector((state: RootState) => state.project.progress);
  useEffect(() => {
    if (progress === "done" && open) {
      dispatch(resetProgress());
      setOpen(false);
      handleOpenSnackbar();
    }
  }, [progress, open, dispatch]);

  return (
    <Wrapper>
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
          Create Customer Success
        </Alert>
      </Snackbar>
      <Button
        style={{
          background: "#f24b50",
          height: "35px",
          width: "100%",
          textTransform: "capitalize",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
        }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New Client
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 250,
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form onSubmit={handleSubmit(handleCreate)}>
            <TitleClient>New Client</TitleClient>
            <StyledInput>
              <Controller
                name="name"
                render={({ field }) => {
                  return (
                    <TextField
                      label="Name *"
                      variant="standard"
                      {...field}
                      style={{
                        width: "100%",
                        // marginBottom: "20px",
                        marginTop: "15px",
                      }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
              <Controller
                name="address"
                render={({ field }) => {
                  return (
                    <TextField
                      label="Address"
                      variant="standard"
                      {...field}
                      style={{
                        width: "100%",
                        fontSize: "14px",
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                      InputLabelProps={{ style: { fontSize: 14 } }}
                    />
                  );
                }}
                control={control}
                defaultValue=""
              />
            </StyledInput>
            <StyleButton>
              <Button
                variant="outlined"
                sx={{
                  color: "rgb(51, 51, 51)",
                  border: "none",
                  textTransform: "capitalize",
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 2px 5px 0px, rgba(0, 0, 0, 0.12) 0px 2px 10px 0px",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  background: "#f24b50",
                  color: "rgba(0, 0, 0, 0.26)",
                  textTransform: "capitalize",
                }}
              >
                Save
              </Button>
            </StyleButton>
          </Form>
        </Box>
      </Modal>
    </Wrapper>
  );
};

export default CreateClient;