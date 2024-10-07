"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import styled from 'styled-components';
import SelectLanguage from '../selectLanguage/selectLanguage';
import { useTranslations } from 'next-intl';

const ButtonBase = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const ButtonOut = styled(ButtonBase)`
  background-color: #4a4a4a; /* Gris oscuro suave */
  color: white;
  border: none;

  &:hover {
    background-color: #3a3a3a;
  }
`;

const NavbarContainer = styled.nav`
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const UL = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 40%;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #ffdd00;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  gap: 60px;
`;

const Navbar = () => {
  const { data: session } = useSession();
  const translate = useTranslations('');

  return (
    <NavbarContainer>
      <UL>
        <StyledLink href="/"> {translate('home')} </StyledLink>
        <SelectLanguage />
        {session?.user ? (
          <>
            <StyledLink href="/dashboard">Dashboard</StyledLink>
            <ButtonOut onClick={() => signOut()}>
              {translate('logout')}
            </ButtonOut>
          </>
        ) : null}
      </UL>

      {!session?.user && (
        <LeftDiv>
          <StyledLink href="/login"> {translate('login')} </StyledLink>
          <StyledLink href="/register"> {translate('register')} </StyledLink>
        </LeftDiv>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
