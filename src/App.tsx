import React, { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Layout from './components/Layout'
import NotFound from './components/NotFound/NotFound'
import Login from "./features/login/login";
import Root from './routes/Root'
import Home from "./routes/Home";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/account/login" />
            <Root path="/app" component={Layout} exact={false} />
            <Home path="/account/login" component={Login} exact={false} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>

    </div>
  );
}

export default App;

