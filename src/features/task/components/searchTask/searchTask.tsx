import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";
import Search from "@mui/icons-material/Search";
import { ISearch } from '../../../../api/commonType'

const Container = styled.div`
  margin-left: 100px;
  color: rgb(85, 85, 85)
`;

const SearchTask: React.FC<ISearch> = ({ setSearchKey }) => {
  const [inputText, setInputText] = useState("");
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchKey(inputText);
    }
  };

  const onChange = (e: any): void => {
    setInputText(e.currentTarget.value.trim());
    if (e.currentTarget.value.trim().length === 0)
      setSearchKey(e.currentTarget.value.trim());
  };

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
        style={{ width: "400px", color: 'rgb(85, 85, 85)', marginTop: '15px' }}
        label="Search by task name"
        variant="outlined"
        onChange={(e) => onChange(e)}
        onKeyUp={onKeyUp}
      />
    </Container>
  );
};

export default SearchTask;