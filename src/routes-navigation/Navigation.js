import React, { useContext, useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";
import {
  Navbar,
  NavItem,
  NavLink,
  Nav,
  NavbarToggler,
  Collapse,
} from "reactstrap";

/** Navigation bar for site that shows on every page
 *
 * Logged in users see companies, jobs, profile, and logout
 *
 * Logged out users see login and signup
 *
 * Rendered by App
 */

const Navigation = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  const [isOpen, setIsOpen] = useState(false);

  function loggedInNav() {
    return (
      <>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/companies">
            Companies
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/jobs">
            Jobs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/applications">
            Applications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/profile">
            Profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/logout" onClick={logout}>
            Logout {currentUser.username}
          </NavLink>
        </NavItem>
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <NavItem>
          <NavLink tag={RRNavLink} to="/login">
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} to="/signup">
            Signup
          </NavLink>
        </NavItem>
      </>
    );
  }

  return (
    <div>
      <Navbar color="primary" dark expand="md" light>
        <NavLink tag={RRNavLink} to="/" className="navbar-brand">
          Home
        </NavLink>
        {/* onClick toggle whether navbar drops down to display links */}
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {currentUser ? loggedInNav() : loggedOutNav()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
