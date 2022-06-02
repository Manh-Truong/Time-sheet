import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { getProject } from "../../../../redux/actions/projectAction";
import { projectSelector } from "../../../../redux/reducers/projectReducer";

const ProjectContent = styled.div`
  width: 100%;
  height: 100%;
  boxshadow: "0 2px 10px rgba(0.5,0.5,0.5,0.5)";
`;

const SelectProject: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProject({ status: 0 }));
  }, [dispatch]);

  const handleStatus0 = () => {
    dispatch(getProject({ status: 0 }));
  };
  const handleStatus1 = () => {
    dispatch(getProject({ status: 1 }));
  };
  const handleStatus = () => {
    dispatch(getProject({}));
  };

  const ProjectStatus = useSelector(projectSelector.getAllProjectSelector);
  const ProjectStatus0 = useSelector(projectSelector.getAllProjectStatus0);
  const ProjectStatus1 = useSelector(projectSelector.getAllProjectStatus1);

  const [projects, setProjects] = useState("0");
  const handleChange = (event: SelectChangeEvent) => {
    setProjects(event.target.value as string);
  };

  useEffect(() => {
    dispatch(getProject({}));
  }, [dispatch]);

  return (
    <ProjectContent>
      <FormControl sx={{ width: "230px", height: "40px" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={projects}
          onChange={handleChange}
          style={{ height: "60px", fontSize: "14px" }}
        >
          <MenuItem value={0} onClick={handleStatus0}>
            Active Projects ({ProjectStatus0 && ProjectStatus0.length})
          </MenuItem>
          <MenuItem value={1} onClick={handleStatus1}>
            Deactive Projects ({ProjectStatus1 && ProjectStatus1.length})
          </MenuItem>
          <MenuItem value={2} onClick={handleStatus}>
            All Projects ({ProjectStatus && ProjectStatus.length})
          </MenuItem>
        </Select>
      </FormControl>
    </ProjectContent>
  );
};

export default SelectProject;