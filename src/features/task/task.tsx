import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from '@mui/icons-material/Refresh';
import { getTask } from '../../redux/actions/taskAction'
import OtherTask from "./components/otherTask/otherTask";
import { setSearchName } from '../../redux/reducers/taskReducer'
import SearchTask from "./components/searchTask/searchTask";
import CreateTasks from "./components/createTask/createTask";
import CommonTask from "./components/commontask/commonTask";

const TaskContent = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid rgba(204,204,204,.35);
`;

const TitleHeader = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #111;
  line-height: 19.8px;
  font-family: Roboto, Arial, Tahoma, sans-serif;
`;

const AddContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Add = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 40px;
`;

const Refresh = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #4c4c4c;
  padding: none;
`;

const ButtonRefresh = styled.div`
  display: flex;
  gap: 5px;
  background: GhostWhite;
  border: none;
  position: absolute;
  margin-top: 30px;
  z-index: 1;
  :hover {
    background: #e9e9e9;
    cursor: pointer;
  }
  width: 100px;
  height: 45px;
  overflow: auto;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    dispatch(getTask());
  });

  useEffect(() => {
    dispatch(
      setSearchName({
        searchName: searchItem,
      })
    );
  }, [searchItem, dispatch]);

  const [icon, setIcon] = useState(false);
    const handleClickIcon = () => {
        setIcon((prev) => !prev);
    };

  return (
    <TaskContent>
      <TaskHeader>
        <TitleHeader>Manage Tasks</TitleHeader>
        <Refresh>
            <div onClick={handleClickIcon}>
                <MoreVertIcon sx={{cursor: "pointer"}} />   
            </div>
            {icon ? (
            <ButtonRefresh onClick={() => window.location.reload()} 
            style={{ color: 'gray', display: "flex", paddingTop: 17, paddingLeft: 10}}>
                    <RefreshIcon style={{color: "gray"}}/>Refresh
            </ButtonRefresh>
            ) : null}
        </Refresh>
      </TaskHeader>
      <AddContent>
        <Add>
          <CreateTasks />
          <SearchTask setSearchKey={setSearchItem} />
        </Add>
      </AddContent>
      <CommonTask />
      <OtherTask />
    </TaskContent>
  );
};

export default Tasks;