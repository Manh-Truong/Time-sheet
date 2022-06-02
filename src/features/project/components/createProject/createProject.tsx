import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { TabPanel } from "@mui/lab";
import {
  createProject,
  getAllCustomer,
  getUserNotPagging,
} from "../../../../redux/actions/projectAction";
import { getTask } from "../../../../redux/actions/taskAction";
import General from "./tabCreateProject/general/general";
import Tasks from "./tabCreateProject/tasks/tasks";
import Team from "./tabCreateProject/team/team";
import { RootState } from "../../../../redux/store";
import { resetProgress } from "../../../../redux/reducers/projectReducer";


const TitleHeader = styled.div`
  font-size: 30px;
  font-weight: bold;
  line-height: 48px;
  z-index: 1;
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto, Arial, Tahoma, sans-serif;
  margin-bottom: 10px;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(204,204,204,.35);
`;

const NewProject = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 250px;
`;

const ButtonNewProject = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-right: 17px;
  padding-top: 25px;
`;

const ListTab = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 423px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export interface INewProject {
  code: string;
  customerId: number;
  isAllUserBelongTo: boolean;
  name: string;
  note: string;
  projectTargetUsers: {
    userId: number;
    roleName: string;
    id: number;
  }[];
  projectType: number;
  status: number;
  tasks: { taskId: number; billable?: boolean; id: number }[];
  timeEnd: string;
  timeStart: string;
  users: { userId: number; type?: number; id: number }[];
}

const CreateProjects: React.FC = () => {
  const dispatch = useDispatch();
  const { reset, register, handleSubmit, setValue } = useForm<INewProject>();

  const [open, setOpen] = useState(false);
  const progress = useSelector((state: RootState) => state.project.progress);
  const selectedMembers = useSelector((state: RootState) => state.project.selectedMembers);
  const selectedTasks = useSelector((state: RootState) => state.project.viewTask);

  // useEffect(() => {
    // dispatch(getTask());
    // dispatch(getAllCustomer());
    // dispatch(getUserNotPagging());
  // }, []);

  const handleOpen = () => {
    setOpen(true);
    dispatch(getTask());
    dispatch(getAllCustomer());
    dispatch(getUserNotPagging());
  };

  const handleClose = () => {
    setOpen(false);
    reset({
      name: "",
      code: "",
      status: 0,
      timeStart: "",
      timeEnd: "",
      note: "",
      projectType: 0,
      customerId: 0,
      tasks: [],
      users: [],
      projectTargetUsers: [],
      isAllUserBelongTo: false,
    });
  };

  const [value, setValueTab] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpenSnackbar = () => {
    setOpen(false);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const onSaveProject = (props: INewProject) => {
    let members: { userId: number; id: number; type?: number }[] = [];
    selectedMembers.forEach((member) =>
      members.push({
        id: 0,
        userId: member.id,
        type:
          typeof member.projectType === "undefined" ? 1 : member.projectType,
      })
    );
    let tasks: { id: number; taskId: number; billable?: boolean }[] = [];
    selectedTasks.forEach((task) => {
      tasks.push({ taskId: task.id, id: 0, billable: task.billable || false });
    });
    const newProject: INewProject = {
      name: props.name,
      code: props.code,
      status: props.status,
      timeStart: props.timeStart,
      timeEnd: props.timeEnd,
      note: props.note,
      projectType: props.projectType || 1,
      customerId: props.customerId,
      tasks: tasks,
      users: members,
      projectTargetUsers: props.projectTargetUsers,
      isAllUserBelongTo: props.isAllUserBelongTo,
    };
    dispatch(createProject(newProject));
    reset({
      name: "",
      code: "",
      status: 0,
      timeStart: "",
      timeEnd: "",
      note: "",
      projectType: 0,
      customerId: 0,
      tasks: [],
      users: [],
      projectTargetUsers: [],
      isAllUserBelongTo: false,
    });
  };

  useEffect(() => {
    if (progress === "done" && open) {
      dispatch(resetProgress());
      setOpen(false);
      // handleOpenSnackbar();
    }
  }, [progress, open, dispatch]);

  return (
    <NewProject>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={handleSnackbarClose}
        >
          Create Project Success
        </Alert>
      </Snackbar>
      <Button
        style={{
          background: "#f24b50",
          height: "50px",
          fontSize: "14px",
          width: "150px",
          textTransform: "capitalize",
        }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        New Project
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "92%",
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            borderRadius: 2
          }}
        >
          <form onSubmit={handleSubmit(onSaveProject)}>
            <Header>
              <TitleHeader>Create Project</TitleHeader>
              <CloseIcon onClick={handleClose} />
            </Header>
            <Box sx={{ width: "100%", zIndex: 0, paddingTop: 3 }}>
              <ListTab>
                <TabContext value={value}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider"
                    }}
                  >
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="General" value="1" sx={{textTransform: "capitalize"}}/>
                      <Tab label="Teams" value="2" sx={{textTransform: "capitalize"}}/>
                      <Tab label="Tasks" value="3" sx={{textTransform: "capitalize"}}/>
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <General register={register} setValue={setValue} />
                  </TabPanel>
                  <TabPanel value="2">
                    <Team />
                  </TabPanel>
                  <TabPanel value="3">
                    <Tasks />
                  </TabPanel>
                </TabContext>
              </ListTab>
            </Box>
            <ButtonNewProject>
              <Button
                variant="outlined"
                color="error"
                sx={{
                  color: "#333333",
                  textTransform: "capitalize",
                  border: "none",
                  background: "white",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 5px 0px, rgba(0, 0, 0, 0.12) 0px 2px 10px 0px",
                  fontSize: 13
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{
                  background: "#f24b50",
                  color: "#333333",
                  textTransform: "capitalize",
                  fontSize: 13
                }}
              >
                Save
              </Button>
            </ButtonNewProject>
          </form>
        </Box>
      </Modal>
    </NewProject>
  );
};

export default CreateProjects;