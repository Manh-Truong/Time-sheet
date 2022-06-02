import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from '@mui/icons-material/Refresh';
import { getProject } from '../../redux/actions/projectAction';
import SearchProject from "./components/searchProject/searchProject";
import ListProjects from "./components/listProject/listProject";
import CreateProjects from "./components/createProject/createProject";
import SelectProject from '../project/components/selectProject/selectProject'

const ProjectContent = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const HeaderProject = styled.div`
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
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  gap: 50px;
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

const Projects: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProject({ status: 0 }));
    }, [dispatch]);

    const [icon, setIcon] = useState(false);
    const handleClickIcon = () => {
        setIcon((prev) => !prev);
    };

    return (
        <ProjectContent>
            <HeaderProject>
                <TitleHeader>Manage Projects</TitleHeader>
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
            </HeaderProject>
            <AddContent>
                <CreateProjects />
                <SelectProject/>
                <SearchProject/>
            </AddContent>
            <ListProjects />
        </ProjectContent>
    );
};

export default Projects;
