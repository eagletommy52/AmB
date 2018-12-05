import React, { Component } from 'react';
import './App.css';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { faAmazon } from '@fortawesome/free-brands-svg-icons'

import Nav from './components/Nav/Nav';
import EventDeets from './components/EventDeets/EventDeets'
import Party from './components/Party/Party';
import Story from './components/Story/Story';

const Sticky = require('sticky-js');
const sticky = new Sticky('.backToTop');


library.add(faAmazon, faAngleDoubleUp)


configureAnchors({scrollDuration: 600})

class App extends Component {
  render() {
    
    return (
      <div className="App">
        <div className="hero" style={{"height": "100vh"}}>
        
          <Nav />
        
        
        
      </div>
      
        <ScrollableAnchor id={'event'}>
          
          <section>
        
            <div className="backToTop" >
              <a href="#home">
              <FontAwesomeIcon size="5x" icon="angle-double-up" />
              </a>
            </div>
            <EventDeets />
          
          </section >
        </ScrollableAnchor>
        <ScrollableAnchor id={'party'}>
          <section > 
          <h2>Meet the Team</h2>
            <Party />
          </section>
        </ScrollableAnchor>
        <ScrollableAnchor id={'gallery'}>
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
        </ScrollableAnchor>
        <ScrollableAnchor id={'registry'}>
          <section className='registryContainer' style={{"marginBottom": "10vh"}}> 
          <h2>Registry</h2>
          <p>We are so happy that you’ll be able to join us for our wedding.  While the presence of your company is the only gift we could ever ask for, if you'd like to add anything else we are currently saving up for our dream honeymoon in August after the wedding or feel free to browse the registry links below:</p>
          <div class="registry">
            <a href="https://www.honeyfund.com/wedding/AndrewMarriesBeth">
            <img alt="Honeyfund" src={require('./images/honeyfund.png')} width="135px"/><br/>
            Honeyfund
            </a>
            <a href="https://smile.amazon.com/wedding/share/AndrewMarriesBeth">
            <FontAwesomeIcon size="5x" icon={['fab', 'amazon']}/><br/>
            Amazon
            </a>
            <a href="https://www.macys.com/wgl/registry/guest/6869695">
            <img alt="Macys" src={require('./images/Macys_logo.svg')} width="200px"/><br/>
            Macys
            </a>
            
            <a href="http://www.rei.com/GiftRegistryDetails/GR152957214?cm_mmc=gift_reg-_-Wedding-_-announce-_-02Dec2018">
            <img alt="REI" src={require('./images/REI-Logo.png')} width="200px"/><br/>
            REI
            </a>
          </div>
          </section>
        </ScrollableAnchor>
        <ScrollableAnchor id={'story'}>
          <section style={{"height": "50vh"}}> 
          <h2>Our Story</h2>
          <Story />
          </section>
        </ScrollableAnchor>  
      </div>
    );
  }
}

export default App;
