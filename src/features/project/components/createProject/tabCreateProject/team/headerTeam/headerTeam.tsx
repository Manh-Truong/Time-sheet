import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Avatar,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { removeMember } from '../../../../../../../redux/reducers/projectReducer'
import { IUserNotPagging } from '../../../../../../../api/project/type'

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 15px;
`;

const ViewHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const ViewMember = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const BranchOne = styled.div`
  font-weight: 600;
  background: #f44336;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const BranchTwo = styled.div`
  font-weight: 600;
  background: #4caf50;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const BranchThree = styled.div`
  padding: 2px 5px;
  font-size: 10px;
  border-radius: 10px;
  background: #2196f3;
  color: #fff;
  font-weight: 600;
`;

const BranchFour = styled.div`
  font-weight: 600;
  background: #ff9800;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelIntern0 = styled.div`
  font-weight: 600;
  background-color: rgb(178, 190, 181);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelIntern1 = styled.div`
  font-weight: 600;
  background-color: rgb(143, 151, 121);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelIntern2 = styled.div`
  font-weight: 600;
  background-color: rgb(102, 93, 30);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelFresher0 = styled.div`
  font-weight: 600;
  background-color: rgb(119, 119, 119);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelFresher1 = styled.div`
  font-weight: 600;
  background-color: rgb(33, 150, 243);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelFresher2 = styled.div`
  font-weight: 600;
  background-color: rgb(137, 207, 240);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelFresher3 = styled.div`
  font-weight: 600;
  background-color: rgb(49, 140, 231);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelJunior0 = styled.div`
  font-weight: 600;
  background-color: rgb(191, 175, 178);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelJunior1 = styled.div`
  font-weight: 600;
  background-color: rgb(165, 113, 100);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelJunior2 = styled.div`
  font-weight: 600;
  background-color: rgb(59, 47, 47);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelMiddle0 = styled.div`
  font-weight: 600;
  background-color: rgb(164, 198, 57);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelMiddle1 = styled.div`
  font-weight: 600;
  background-color: rgb(141, 182, 0);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelMiddle2 = styled.div`
  font-weight: 600;
  background-color: rgb(0, 128, 0);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelSenior0 = styled.div`
  font-weight: 600;
  background-color: rgb(241, 156, 187);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelSenior1 = styled.div`
  font-weight: 600;
  background-color: rgb(171, 39, 79);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const LevelSenior2 = styled.div`
  font-weight: 600;
  background-color: rgb(229, 43, 80);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const TextView = styled.div`
  font-size: 15px;
`;

const HeaderTeam: React.FC<{selectedMember: IUserNotPagging;}> = ({ selectedMember }) => {
  const [memberType, setMemberType] = useState<string>("1");

  const dispatch = useDispatch();
  const handleChangeMemberType = (event: SelectChangeEvent) => {
    setMemberType(event.target.value);
  };
  const handleRemoveMember = (user: IUserNotPagging) => {
    dispatch(removeMember(user));
  };

  return (
    <Header>
      <ViewHeader>
        <ClearIcon onClick={() => handleRemoveMember(selectedMember)} />
        <ViewMember>
          <Avatar
            src={`http://dev.timesheetapi.nccsoft.vn/${selectedMember.avatarPath}`}
          />
          <TextView>{selectedMember.name}</TextView>
          {selectedMember.branch === 0 ? (
            <BranchOne>HN</BranchOne>
          ) : selectedMember.branch === 1 ? (
            <BranchTwo>ĐN</BranchTwo>
          ) : selectedMember.branch === 2 ? (
            <BranchThree>HCM</BranchThree>
          ) : (
            <BranchFour>Vinh</BranchFour>
          )}
          {selectedMember.type === 0 ? (
            <BranchOne>Staff</BranchOne>
          ) : selectedMember.type === 1 ? (
            <BranchTwo>Internship</BranchTwo>
          ) : selectedMember.type === 2 ? (
            <BranchThree>Collaborator</BranchThree>
          ) : null}
          {selectedMember.level === 0 ? (
            <LevelIntern0>Intern_0</LevelIntern0>
          ) : selectedMember.level === 1 ? (
            <LevelIntern1>Intern_1</LevelIntern1>
          ) : selectedMember.level === 2 ? (
            <LevelIntern2>Intern_2</LevelIntern2>
          ) : selectedMember.level === 3 ? (
            <LevelFresher0>Prefresher</LevelFresher0>
          ) : selectedMember.level === 4 ? (
            <LevelFresher1>Fresher-</LevelFresher1>
          ) : selectedMember.level === 5 ? (
            <LevelFresher2>Fresher+</LevelFresher2>
          ) : selectedMember.level === 6 ? (
            <LevelFresher3>Fresher+</LevelFresher3>
          ) : selectedMember.level === 7 ? (
            <LevelJunior0>Junior-</LevelJunior0>
          ) : selectedMember.level === 8 ? (
            <LevelJunior1>Junior</LevelJunior1>
          ) : selectedMember.level === 9 ? (
            <LevelJunior2>Junior+</LevelJunior2>
          ) : selectedMember.level === 10 ? (
            <LevelMiddle0>Middle-</LevelMiddle0>
          ) : selectedMember.level === 11 ? (
            <LevelMiddle1>Middle</LevelMiddle1>
          ) : selectedMember.level === 12 ? (
            <LevelMiddle2>Middle+</LevelMiddle2>
          ) : selectedMember.level === 13 ? (
            <LevelSenior0>Senior-</LevelSenior0>
          ) : selectedMember.level === 14 ? (
            <LevelSenior1>Senior</LevelSenior1>
          ) : selectedMember.level === 15 ? (
            <LevelSenior2>Senior+</LevelSenior2>
          ) : null}
        </ViewMember>
      </ViewHeader>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <Select
          id="demo-simple-select"
          value={memberType}
          onChange={handleChangeMemberType}
        >
          <MenuItem value={0}>Member</MenuItem>
          <MenuItem value={1}>Project Manager</MenuItem>
          <MenuItem value={2}>Shadow</MenuItem>
          <MenuItem value={3}>Deactive</MenuItem>
        </Select>
      </FormControl>
    </Header>
  );
};

export default HeaderTeam;
