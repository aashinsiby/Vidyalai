import React from 'react';
import styled from '@emotion/styled';

const NavbarWrapper = styled('div')(() => ({
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
}));

const Navbar = styled('nav')(() => ({
  backgroundColor: '#333',
  color: '#fff',
  width: '100%',
  padding: '10px 0', // Add some padding for better appearance
}));

const NavList = styled('ul')(() => ({
  listStyle: 'none',
  margin: 0,
  paddingLeft: '20px',
  display: 'flex', // Use flexbox for better alignment
}));

const ListItem = styled('li')(() => ({
  marginRight: '20px',
  fontSize: '18px',
  cursor: 'pointer',
}));

const Link = styled('a')(() => ({
  color: '#fff',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

const TopNavbar = () => {
  return (
    <NavbarWrapper>
      <Navbar>
        <NavList>
          <ListItem>
            <Link href={'/'}>Home</Link>
          </ListItem>
          <ListItem>
            <Link href={'/users'}>Users</Link>
          </ListItem>
        </NavList>
      </Navbar>
    </NavbarWrapper>
  );
};

export default TopNavbar;
