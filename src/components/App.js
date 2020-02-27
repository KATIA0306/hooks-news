import React from "react";
import styled from "styled-components"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import CreateLink from "./Link/CreateLink"
import Login from "./Auth/Login"
import ForgotPassword from  "./Auth/ForgotPassword"
import SearchLinks from "./Link/SearchLinks"
import LinkList from "./Link/LinkList"
import LinkDetail from "./Link/LinkDetail"
import Header from "./Header"
import useAuth from "./Auth/useAuth"
import firebase, { FirebaseContext } from "./../firebase"

const AppContainer = styled.div`
  width: 85%;
  margin-right: auto;
  margin-left: auto;  
` 

const RouteContainer = styled.div`
  background-color: rgb(246, 246, 239);
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
`
function App() {
  const user = useAuth()
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <AppContainer>
          <Header />
          <RouteContainer>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/new/1" />} />
              <Route path="/create" component={CreateLink} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={ForgotPassword} />
              <Route path="/search" component={SearchLinks} />
              <Route path="/top" component={LinkList} />
              <Route path="/new/:page" component={LinkList} />
              <Route path="/link/:linkId" component={LinkDetail} />
            </Switch>
          </RouteContainer>
        </AppContainer>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
