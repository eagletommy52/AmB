import React from 'react';
import './Nav.css';
import ScrollableAnchor, { configureAnchors, goToTop } from 'react-scrollable-anchor';
configureAnchors({scrollDuration: 600})

const Nav = (props) => {
  return (
    <ScrollableAnchor id={'home'}>
    <div className='navBar'>
      <ul>
        <li>
          <ul className='sideNav'>
            <li><a href='#home' onClick={goToTop()}>Home</a></li>
            <li><a href='#event'>Event</a></li>
            <li><a href='#story'>Our Story</a></li>
          </ul>
        </li>
        <li><img src={require('../../images/mbandrew.png')} alt="Mary Beth and Andrew"/></li>
        <li>
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