import darkModeIcon from '../assets/icons/dark-mode-icon.svg'
import lightModeIcon from '../assets/icons/light-mode-icon.svg'
import { HandySvg } from 'handy-svg'
import styled from 'styled-components'
import theme from 'styled-theming'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { sidebarToggled, toggleMode } from '../features/app-slice'
import React from 'react'
import burgerIcon from '../assets/icons/burger-menu-icon.svg'

const headingColor = theme('mode', {
  light: '#1C1E21',
  dark: '#E3E3E3;'
})

const LightModeIcon = () => (
  <HandySvg
    src={lightModeIcon}
    className="icon"
    width="32"
    height="32"
    color="#000"
  />
)

const DarkModeIcon = () => (
  <HandySvg src={darkModeIcon} className="icon" width="32" height="32" />
)

const LogoImg = styled.img`
  width: 32px;
`

const sectionBackgroundColor = theme('mode', {
  light: '#FFF',
  dark: 'rgb(36, 37, 38)'
})

const Container = styled.header`
  background-color: ${sectionBackgroundColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  padding: 10px;
  z-index: 1;
`

const ToggleButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
`

const Heading = styled.h1`
  font-size: 18px;
  color: ${headingColor};
`

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const LogoButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

export const Header = () => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.app.mode)

  const toggleTheme = () => {
    dispatch(toggleMode(mode === 'light' ? 'dark' : 'light'))
  }

  const toggleSidebar = () => {
    dispatch(sidebarToggled(true))
  }

  return (
    <Container>
      <HeadingWrapper>
        <LogoButton onClick={toggleSidebar}>
          <LogoImg src={burgerIcon}></LogoImg>
        </LogoButton>
        <LogoImg
          src="/logo192.png"
          alt="logo"
          style={
            mode === 'light' ? { filter: 'invert(1)' } : { filter: 'invert(0)' }
          }
        />
        <Heading>Weathered</Heading>
      </HeadingWrapper>
      <ToggleButton onClick={toggleTheme}>
        {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
      </ToggleButton>
    </Container>
  )
}
