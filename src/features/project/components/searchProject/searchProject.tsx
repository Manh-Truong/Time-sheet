import React from "react";
import { InputAdornment, TextField} from "@mui/material";
import styled from "styled-components";
import Search from "@mui/icons-material/Search";

const Container = styled.div`
  display: flex;
  padding: 5px 10px;
  gap: 150px;
`;

const SearchProject: React.FC = () => {

  return (
    <Container>
      <TextField
        id="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        style={{ width: "430px" }}
        label="Search by client or project name"
        variant="outlined"
      />
    </Container>
  );
};

export default SearchProject;
