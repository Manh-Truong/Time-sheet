import React from "react";
import styled from "styled-components";
import Header from './Header/Header'
import MainView from './mainView/MainView'
import SideBar from './Sidebar/Sidebar'

const MainContent = styled.div`
  display: flex;
`;

const Layout = () => {
    return (
        <div>
            <Header />
            <MainContent>
                <SideBar />
                <MainView />
            </MainContent>
        </div>
    );
};

export default Layout;
