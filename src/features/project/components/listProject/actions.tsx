import {useState} from "react";
import {useDispatch} from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditProject from "../editProject/editProject";
import ActiveAndInactive from "./actions/ActionActive";
import { IProjectReq } from "../../../../api/project/type";
import DeleteProject from "./actions/ActionDelete";
import {
  getProject,
  getAllCustomer,
  getUserNotPagging,
} from "../../../../redux/actions/projectAction";

const ButtonActions = styled(Button)`
  :hover {
    background: #fff;
  }
`;

const MenuActions = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 5,
    minWidth: 150,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 20,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Actions: React.FC<{ project: IProjectReq}> = ({ project }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(getProject({}));
    dispatch(getAllCustomer());
    dispatch(getUserNotPagging());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ButtonActions
        id="demo-customized-button"
        aria-controls="demo-customized-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        sx={{
          background: "white",
          color: "rgba(0, 0, 0, 0.87)",
          fontSize: "14px",
          border: "none",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
          textTransform: "capitalize",
          fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
        }}
        disableElevation
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        Actions
      </ButtonActions>
      <MenuActions
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <EditProject/>
        <MenuItem onClick={handleClose} disableRipple>
          <VisibilityIcon />
          <p>View</p>
        </MenuItem>
        <ActiveAndInactive  project={project} />
        <DeleteProject project={project} />
      </MenuActions>
    </div>
  );
};

export default Actions;