import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import CreateClient from "./newClient/newClient";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { INewProject } from "../../createProject";
import { borderColor } from "@mui/system";

const CreateGeneral = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormList = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 20px;
  &:hover{
    border-color: #333;
  }
`;

const TitleName = styled.div`
  width: 120px;
  font-size: 14px;
  font-weight: 600;
`;
const CheckboxUser = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  font-size: 13px;
  font-weight: bold;
`;
const BtnGeneral = styled(Button)`
  width: 200px;
`;

interface useForm {
  register: UseFormRegister<INewProject>;
  setValue: UseFormSetValue<INewProject>;
}

const General: React.FC<useForm> = ({ register, setValue }) => {
  const [customer, setCustomer] = useState("");
  const [Active, setActive] = useState("Fixed Fee");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const customers = useSelector((state: RootState) => state.project.customers);

  const handleChange = (e: SelectChangeEvent) => {
    setCustomer(e.target.value as string);
  };

  return (
    <CreateGeneral>
      <FormList>
        <TitleName>Client*</TitleName>
        <FormControl sx={{ width: "50%" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ height: "50px" }}
            value={customer}
            {...register("customerId", { required: true })}
            onChange={handleChange}
          >
            {customers.map((item) => {
              return <MenuItem value={item.id}>{item.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <CreateClient />
      </FormList>
      <FormList>
        <TitleName>Project Name*</TitleName>
        <TextField
          hiddenLabel
          id="outlined-basic"
          variant="outlined"
          placeholder="Project name"
          {...register("name", { required: true })}
          sx={{
            width: "50%",
          }}
        />
      </FormList>
      <FormList>
        <TitleName>Project Code*</TitleName>
        <TextField
          hiddenLabel
          id="outlined-basic"
          variant="outlined"
          placeholder="Project code"
          {...register("code", { required: true })}
          sx={{
            border: "none",
            width: "50%",
          }}
        />
      </FormList>
      <FormList>
        <TitleName>Dates*</TitleName>
        <TextField
          style={{ width: "24%" }}
          type="date"
          placeholder="Start at"
          {...register("timeStart")}
        />
        <p style={{ padding: "0 5px" }}>to</p>
        <TextField
          style={{ width: "24%" }}
          type="date"
          placeholder="End at"
          {...register("timeEnd")}
        />
      </FormList>
      <FormList>
        <TitleName>Note</TitleName>
        <TextareaAutosize
          {...register("note")}
          minRows={3}
          aria-label="empty textarea"
          style={{ width: 750, borderColor: "rgb(216,216,216)", borderRadius: 3 }}
        />
      </FormList>
      <FormList style={{ paddingBottom: "0" }}>
        <TitleName>All User</TitleName>
        <CheckboxUser>
          <Checkbox {...label} {...register("isAllUserBelongTo")} />
          <Title>
            Auto add user as a member of this project when creating new user
          </Title>
        </CheckboxUser>
      </FormList>
      <FormList>
        <TitleName>Project Type*</TitleName>
        <Stack direction="row" spacing={5}>
          <BtnGeneral
            variant="outlined"
            style={{
              background: Active === "Time & Materials" ? "#f36c00" : "#fff",
              color: Active === "Time & Materials" ? "#fff" : "#000",
              borderColor: Active === "Time & Materials" ? "#fff" : "gray",

              width: "160px",
              height: "43px",
              fontSize: "13px",
              textTransform: "capitalize",
              fontWeight: "bold"
            }}
            onClick={() => {
              setActive("Time & Materials");
              setValue("projectType", 0);
            }}
          >
            Time & Materials
          </BtnGeneral>
          <BtnGeneral
            variant="outlined"
            style={{
              background: Active === "Fixed Fee" ? "#f36c00" : "#fff",
              color: Active === "Fixed Fee" ? "#fff" : "#000",
              borderColor: Active === "Fixed Fee" ? "#fff" : "gray",
              
              width: "160px",
              height: "43px",
              fontSize: "13px",
              textTransform: "capitalize",
              fontWeight: "bold"
            }}
            onClick={() => {
              setActive("Fixed Fee");
              setValue("projectType", 1);
            }}
          >
            Fixed Fee
          </BtnGeneral>
          <BtnGeneral
            variant="outlined"
            style={{
              background: Active === "Non-Billable" ? "#f36c00" : "#fff",
              color: Active === "Non-Billable" ? "#fff" : "#000",
              borderColor: Active === "Non-Billable" ? "#fff" : "gray",
              
              width: "160px",
              height: "43px",
              fontSize: "13px",
              textTransform: "capitalize",
              fontWeight: "bold"
            }}
            onClick={() => {
              setActive("Non-Billable");
              setValue("projectType", 2);
            }}
          >
            Non-Billable
          </BtnGeneral>
          <BtnGeneral
            variant="outlined"
            style={{
              background: Active === "ODC" ? "#f36c00" : "#fff",
              color: Active === "ODC" ? "#fff" : "#000",
              borderColor: Active === "ODC" ? "#fff" : "gray",
              
              width: "160px",
              height: "43px",
              fontSize: "13px",
              textTransform: "capitalize",
              fontWeight: "bold"
            }}
            onClick={() => {
              setActive("ODC");
              setValue("projectType", 3);
            }}
          >
            ODC
          </BtnGeneral>
        </Stack>
      </FormList>
    </CreateGeneral>
  );
};

export default General;