import React from 'react';
import './Nav.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Menu  from 'react-burger-menu/lib/menus/slide'
import './burger.css';

const Nav = (props) => {
  return (
    
    <div className='navBar'>
      <div className="ambBurger">
        
        <Menu left>
          <a href='#home'>Home</a>
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
            <li><AnchorLink href='#home'>Home</AnchorLink></li>
            <li><AnchorLink href='#event'>Event</AnchorLink></li>
            <li><AnchorLink href='#story'>Our Story</AnchorLink></li>
          </ul>
        </li>
        <li id="amb"><img src={'../../images/mbandrew.png'} alt="Mary Beth and Andrew"/></li>
        <li id="rightBar">
          <ul className='sideNav'>
            <li><AnchorLink href='#party'>Wedding Party</AnchorLink></li>
            <li><AnchorLink href='#gallery'>Gallery</AnchorLink></li>
            <li><AnchorLink href='#registry'>Registry</AnchorLink></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default Nav;