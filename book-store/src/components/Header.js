import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';


export const Container = styled.div`
  width: 85%;
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledHeader = styled.header`
  background-color: #333333;
  color: #ffffff;
  padding: 10px 0;
  position: relative;

  & a {
    color: #ffffff;
  }
`;

const Logo = styled(Link)`
  color: #ffffff;
  font-size: 40px;
  font-family: 'Arial';
  text-decoration: none;
`;

export const NavLink = styled(Link)`
  border: 1px #fff solid;
  background: transparent;
  color: #fff;
  padding: 10px 15px;
  font-family: 'Arial';
  font-size: 17px;
  border-radius: 5px;
  margin-left: 20px;
  cursor: pointer;
  transition: 0.1s ease-in;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
    background-color: rgba(255,255,255,0.05);
  }
  &::focus {
    outline: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
`;

const ProfileLink = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  font-family: 'Arial';
  transition: 0.05s ease-in;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const Header = ({ isAuth, user, logOut }) => {
  return (
    <StyledHeader>
      <Container >

        <Nav>
          <Logo to='/' >Book Store</Logo>
          <NavList className="nav__list">
            {isAuth() &&
              <Fragment>
                <NavItem >
                  <ProfileLink to="/profile">{user().email}</ProfileLink>
                </NavItem>
                <NavItem >
                  <NavLink to="/login" onClick={logOut}>Выйти</NavLink>
                </NavItem>
              </Fragment>
            }
            {isAuth() === false &&
              <Fragment>
                <NavItem >
                  <NavLink to='/login'>Войти</NavLink>
                </NavItem>
                <NavItem >
                  <NavLink to='/reg'>Регистрация</NavLink>
                </NavItem>
              </Fragment>
            }
          </NavList>
        </Nav>
      </Container>
    </StyledHeader>
  );
};


export default Header;

Header.propTypes = {
  isAuth: PropTypes.func,
  logOut: PropTypes.func,
  user: PropTypes.func
};
