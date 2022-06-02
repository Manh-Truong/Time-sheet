import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Tasks from '../../features/task/task';
import NotFound from '../NotFound/NotFound';
import Root from '../../routes/Root';
import Projects from "../../features/project/project";

const MainContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    width: 95%;
    height: 95%;
    background: #fff;
    border: 30px solid #e9e9e9;
`;

const MainView: React.FC = () => {
    const { path } = useRouteMatch();
    return (
        <MainContent>
            <Content>
                <Switch>
                    <Route exact path={path} component={NotFound}></Route>
                    <Root
                        path={`${path}/home`}
                        component={NotFound}
                        exact={false}
                    />
                    <Root
                        path={`${path}/main/tasks`}
                        component={Tasks}
                        exact={false}
                    />
                    <Root
                        path={`${path}/main/projects`}
                        component={Projects}
                        exact={false}
                    />
                </Switch>
            </Content>
        </MainContent>
    );
};

export default MainView;


