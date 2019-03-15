import React, { Component } from 'react';
import './Main.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import Nav from './components/Nav/Nav';
import EventDeets from './components/EventDeets/EventDeets'
import Party from './components/Party/Party';
import Story from './components/Story/Story';
import Registry from './components/Registry/Registry';
const Sticky = require('sticky-js');
const sticky = new Sticky('.backToTop');
if(sticky) {}

library.add(faAngleDoubleUp)


class Main extends Component {
  render() {
    
    return (
      <div className="App">
        <div className="hero" style={{"height": "100vh"}}>
          <section id={'home'}>
            <Nav />
          </section>
        </div>
      
        <section id={'event'}>
            <div className="backToTop" >
              <AnchorLink href="#home">
              <FontAwesomeIcon size="5x" icon="angle-double-up" />
              </AnchorLink>
            </div>
            <EventDeets />
        </section>
        <section id={'party'}>
          <section > 
          <h2>Meet the Team</h2>
            <Party />
          </section>
        </section>
        <section id={'gallery'}>
          <section> 
          <h2>Gallery</h2>
            <div className="gallery">
              {
                Array(15).fill(1).map((num,i)=>{
                  return (
                    <div key={"div"+i}className="galleryImg">
                      <img key={i} height="auto"  src={require(`./images/gallerypics/${i+1}.jpg`)} alt={i} />
                    </div>
                )})
              }
            </div>
          </section>
        </section>
        <section id={'registry'}>
          <section className='registryContainer' style={{"marginBottom": "10vh"}}> 
            <Registry />
          </section>
        </section>
        <section id={'story'}>
          <section> 
          <h2>Our Story</h2>
          <Story />
          </section>
        </section>  
      </div>
    );
  }
}

export default Main;
