import React from "react";
import Search from "@mui/icons-material/Search";
import styled from "styled-components";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { filter } from "../../../../../../../redux/reducers/projectReducer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  margin-top: 10px;
  gap: 20px;
`;
const ListBranch: React.FC = () => {
  const dispatch = useDispatch();
  const [branch, setBranch] = React.useState("All");
  const [type, setType] = React.useState("All");
  const [level, setLevel] = React.useState("All");
  const handleChangeBranch = (event: SelectChangeEvent) => {
    setBranch(event.target.value);
    dispatch(filter({ branch: event.target.value, type, level }));
  };
  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
    dispatch(filter({ type: event.target.value, branch, level }));
  };
  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevel(event.target.value);
    dispatch(filter({ level: event.target.value, type, branch }));
  };
  return (
    <Wrapper>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">Branch</InputLabel>
          <Select
            id="demo-simple-select"
            value={branch}
            onChange={handleChangeBranch}
            style={{ fontSize: "14px" }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={0}>Ha Noi</MenuItem>
            <MenuItem value={1}>Da Nang</MenuItem>
            <MenuItem value={2}>Ho Chi Minh</MenuItem>
            <MenuItem value={3}>Vinh</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
          <Select
            id="demo-simple-select"
            value={type}
            onChange={handleChangeType}
            style={{ fontSize: "14px" }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={0}>Staff</MenuItem>
            <MenuItem value={1}>Internship</MenuItem>
            <MenuItem value={2}>Collaborator</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">Level</InputLabel>
          <Select
            id="demo-simple-select"
            value={level}
            onChange={handleChangeLevel}
            style={{ fontSize: "14px" }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={0}>Intern_0</MenuItem>
            <MenuItem value={1}>Intern_1</MenuItem>
            <MenuItem value={2}>Intern_2</MenuItem>
            <MenuItem value={3}>Prefresher</MenuItem>
            <MenuItem value={4}>Fresher-</MenuItem>
            <MenuItem value={5}>Fresher</MenuItem>
            <MenuItem value={6}>Fresher+</MenuItem>
            <MenuItem value={7}>Junior-</MenuItem>
            <MenuItem value={8}>Junior</MenuItem>
            <MenuItem value={9}>Junior+</MenuItem>
            <MenuItem value={10}>Middle-</MenuItem>
            <MenuItem value={11}>Middle</MenuItem>
            <MenuItem value={12}>Middle+</MenuItem>
            <MenuItem value={13}>Senior-</MenuItem>
            <MenuItem value={14}>Senior</MenuItem>
            <MenuItem value={15}>Senior+</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          id="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          style={{ width: "270px" }}
          label="Search by name"
          variant="standard"
        />
      </div>
    </Wrapper>
  );
};

export default ListBranch;