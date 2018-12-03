import React from 'react';
import './Nav.css';
import ScrollableAnchor, { configureAnchors, goToTop } from 'react-scrollable-anchor';
import Menu  from 'react-burger-menu/lib/menus/slide'
import './burger.css';
configureAnchors({scrollDuration: 600})

const Nav = (props) => {
  return (
    <ScrollableAnchor id={'home'}>
    <div className='navBar'>
      <div class="ambBurger">
        
        <Menu right>
          <a href='#home' onClick={goToTop()}>Home</a>
          <a href='#event'>Event</a>
          <a href='#story'>Our Story</a>
          <a href='#party'>Wedding Party</a>
          <a href='#gallery'>Gallery</a>
          <a href='#registry'>Registry</a>
        </Menu>
      </div>
      <ul className="mainMenu">
        <li id="leftBar">
          <ul className='sideNav'>
            <li><a href='#home' onClick={goToTop()}>Home</a></li>
            <li><a href='#event'>Event</a></li>
            <li><a href='#story'>Our Story</a></li>
          </ul>
        </li>
        <li id="amb"><img src={require('../../images/mbandrew.png')} alt="Mary Beth and Andrew"/></li>
        <li id="rightBar">
          <ul className='sideNav'>
            <li><a href='#party'>Wedding Party</a></li>
            <li><a href='#gallery'>Gallery</a></li>
            <li><a href='#registry'>Registry</a></li>
          </ul>
        </li>
      </ul>
    </div>
    </ScrollableAnchor>

  )
}

export default Nav;