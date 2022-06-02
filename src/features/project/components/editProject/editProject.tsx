import React from "react";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";

const MenuEdit = styled(MenuItem)``;

const EditProject: React.FC = () => {

  return (
    <MenuEdit>
      <EditIcon />
      Edit
    </MenuEdit>
  );
};

export default EditProject;
