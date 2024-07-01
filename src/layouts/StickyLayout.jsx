import _ from 'lodash'
import React, { Component, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link
} from "react-router-dom";
import { InView } from 'react-intersection-observer'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}

const overlayStyle = {
  float: 'left',
  margin: '0em 3em 1em 0em',
}

const fixedOverlayStyle = {
  ...overlayStyle,
  position: 'fixed',
  top: '80px',
  zIndex: 10,
}

const overlayMenuStyle = {
  position: 'relative',
  left: 0,
  transition: 'left 0.5s ease',
}

const fixedOverlayMenuStyle = {
  ...overlayMenuStyle,
  left: '800px',
}

function StickyLayout(props) {

  const [style, setStyle] = useState({
    menuFixed: false,
    overlayFixed: false,
  })

  const toggleOverlay = (inView) => setStyle({ overlayFixed: !inView })
  const toggleTopMenu = (inView) => setStyle({ menuFixed: !inView })


  return (
    <div>
  
      <style>
        {`
          html, body {
            background: #fff;
          }
        `}
      </style>


      <Container text style={{ marginTop: '2em', textAlign: 'center' }}>
        <Header as='h1'>Notes</Header>
        <p>
          Writing Anything
        </p>
      </Container>

      <InView onChange={toggleTopMenu}>
        <Menu
          borderless
          fixed={style.menuFixed ? 'top' : undefined}
          style={style.menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container text textAlign='center'>
            <Menu.Item as='home'><Link to="/">home</Link></Menu.Item>
            <Menu.Item as='notes'><Link to="/notes">notes</Link></Menu.Item>
          </Container>
        </Menu>
      </InView>

      <Container text>
        <Outlet />
      </Container>

    </div>
  )
}

export default StickyLayout