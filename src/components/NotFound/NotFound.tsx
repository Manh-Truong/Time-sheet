import React from "react";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;


const NotFound: React.FC = () => {
  return (
    <Content></Content>
  );
};

export default NotFound;
