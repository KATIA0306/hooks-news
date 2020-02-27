import React, { useContext } from "react";
import styled from "styled-components"
import { withRouter, NavLink } from "react-router-dom"
import firebase, { FirebaseContext } from "../firebase"

const HeaderComponent = styled.div`
  background-color: #ff6600;
  white-space: nowrap;
  padding: 0.25rem;
  color: black;
  justify-content: space-between;
  display: flex;
`
const HomeNavLinkTitle = styled(NavLink)`
  font-weight: 700;
  margin-left: 0.25rem;
  margin-right: 5px;
  color: black;
  text-decoration: none;
`
const NewNavLink = styled(NavLink)`
  margin-left: 0.2rem;
  color: black;
  text-decoration: none;
`
const Divider = styled.div`
  margin-left: 0.25rem;
  color: black;
`
const LoginContainer = styled.div`
  display: flex;
`
const styles = {
 logo: {
    width: 20,
    height: 18,
    border: "1px solid white",
    margin: 0,
 }
}

function Header() {
  const { firebase, user } = useContext(FirebaseContext)
  const onLogout = () => firebase.logout()
  return (
    <HeaderComponent>
      <div className="flex">
        <img src="/logo.png" alt="Logo" style={styles.logo} />
        <HomeNavLinkTitle to="/">
          Hooks news
        </HomeNavLinkTitle>
        <NewNavLink to="/">
          New
        </NewNavLink>
        <Divider>|</Divider>
        <NewNavLink to="/top">
          top
        </NewNavLink>
        <Divider>|</Divider>
        <NewNavLink to="/search">
          search
        </NewNavLink>
        { user && (
        <>
        <Divider>|</Divider>
        <NewNavLink to="/create">
          submit
        </NewNavLink>
        </>)}
      </div>
      <LoginContainer>
        {user ? (
          <>
            <div className="header-name">{user.displayName}</div>
            <div className="divider">|</div>
            <div className="header-button" onClick={onLogout}>logout</div>
          </>
        ) :
        (<NewNavLink to="/login">
          login
        </NewNavLink>)}
      </LoginContainer>
    </HeaderComponent>
  )
}

export default Header;
