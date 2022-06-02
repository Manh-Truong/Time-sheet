import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import PeopleIcon from '@mui/icons-material/People';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Collapse from "@mui/material/Collapse";
import HomeIcon from "@mui/icons-material/Home";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import RuleIcon from '@mui/icons-material/Rule';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AddIcon from "@mui/icons-material/Add";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import avatarAdmin from '../../asset/images/avatarAdmin.png'
import styled from "styled-components";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeAccessToken } from '../../utils/LocalStorage'
import { useHistory } from "react-router-dom";
import background from '../../asset/images/background.jpg'

const Container = styled.div`
  width: 350px;
  height: 100%;
`;

const primary = styled.div `
    font-size: 13px;

`;

const User = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
  padding: 10px 15px 0px ;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding-right: 10px;
  };
  div {
      padding:5px 0px 0px 0px
  }
`;

const Logout = styled.div`
  display: flex;
  justify-content: flex-end;
  color:gray;
  padding:none;
  margin-left: 15px;
`;

const ButtonLogout = styled.div`
  display: flex;
  gap: 5px;
  background: #fff;
  border: none;
  padding: 5px;
  position: absolute;
  margin: 15px;
  z-index: 1;
  :hover {
    background: #e9e9e9;
  }
`;

const Title = styled.div`
  color: #fff;
  font-size: 13px;
`;

const StyleLink = styled(Link)`
  color: #000000;
  text-decoration: none;
`;

const SideBar = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [btn, setBtn] = React.useState(false);

    const handleClickBtn = () => {
        setBtn((prev) => !prev);
    };

    const history = useHistory();
    const handleclickLogout = () => {
        removeAccessToken();
        history.push("/account/login");
    };

    return (
        <Container>
            <User>
                <UserInfo>
                    <Info>
                        <img src={`${avatarAdmin}`} alt="avatarAdmin" />
                        <div>
                            <Title>admin admin</Title>
                            <Title>admin@aspnetboilerplate.com</Title>
                        </div>
                    </Info>
                </UserInfo>
                <Logout>
                    <div onClick={handleClickBtn}>
                        <KeyboardArrowDownIcon />
                    </div>
                    {btn ? (
                        <ButtonLogout onClick={handleclickLogout} style={{ color: 'gray', cursor: 'pointer' }}>
                            <LogoutIcon style={{ color: 'gray', cursor: 'pointer' }} />
                            Logout
                        </ButtonLogout>
                    ) : null}
                </Logout>
            </User>
            <List
                sx={{ width: "100%", 
                      heigh: "90%",
                      maxWidth: 300, 
                      bgcolor: "background.paper", 
                      fontSize: 10, 
                      overflowY: 'auto'
                    }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                    ></ListSubheader>
                }
            >
                <StyleLink to="/app/home">
                    <ListItemButton style={{ fontSize: '10px' }}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home Page" />
                    </ListItemButton>
                </StyleLink>

                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <GroupWorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                    {open ? <AddIcon /> : <AddIcon />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                        <ListItemButton sx ={{ marginLeft: '16px' }}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItemButton>

                        <ListItemButton sx ={{ marginLeft: '16px' }}>
                            <ListItemIcon>
                                <LocalOfferIcon />
                            </ListItemIcon>
                            <ListItemText primary="Roles" />
                        </ListItemButton>

                        <ListItemButton sx ={{ marginLeft: '16px' }}>
                            <ListItemIcon>
                                <SettingsApplicationsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Configuration" />
                        </ListItemButton>

                        <ListItemButton sx ={{ marginLeft: '16px' }}>
                            <ListItemIcon>
                                <PeopleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Clients" />
                        </ListItemButton>

                    <List component="div" disablePadding>
                        <StyleLink to="/app/main/tasks">
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <ImportContactsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Tasks" />
                            </ListItemButton>
                        </StyleLink>
                    </List>

                        <ListItemButton sx ={{ marginLeft: '16px' }}>
                            <ListItemIcon>
                                <DateRangeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Leave types" />
                        </ListItemButton>
                </Collapse>

                <StyleLink to="/app/main/projects">
                    <ListItemButton>
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItemButton>
                </StyleLink>

                <ListItemButton>
                    <ListItemIcon>
                        <AccessAlarmIcon />
                    </ListItemIcon>
                    <ListItemText primary="My timesheets" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <DateRangeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Timesheets" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <SupervisedUserCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Timesheets monitoring" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <EventBusyIcon />
                    </ListItemIcon>
                    <ListItemText primary="My leave days / onsite" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <RuleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage team working calendar" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <GroupsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Team working calendar" />
                </ListItemButton>

            </List>
            <footer>
                <hr></hr>
                <small style={{  marginLeft: '15px' }}>© 2022 <b style={{ color: 'red' }}>Timesheet</b>.</small>
                <small style={{ display: 'block',  marginLeft: '15px' }}><b>Version</b> 4.3.0.0 [20222005]</small>
            </footer>
        </Container>
    );
};

export default SideBar;

