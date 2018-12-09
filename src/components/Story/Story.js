import React from 'react';
import './Story.css';

function Story (props) {
  return ( 
  <div className="storyContainer">
      <div className='story'>
      <img src={require('../../images/story/phones.jpg')} alt="Phones Buzzing" />
        <pre>
        
          On a warm summer night in June of 15 <br/>
          Two phones buzzed at once as a match lit the screen <br/>
          A cadet and a chemist, what an unlikely match<br/>
          Little did they know they'd met quite a catch<br/>
          Their first date was spent watching robots compete<br/>
          They closed out the night with an ice-creamy treat<br/>
          </pre>
          <img src={require('../../images/story/robots.jpg')} alt="Robot Competition"  /><pre>
          <br/>
          Before they both knew it they were stealing weekends<br/>
          And by summer's end they were boy and girlfriend<br/>
          </pre>
          <img src={require('../../images/story/gfbf.svg')} alt="Robot Competition"  /><pre>
          
          But as oft does happen, life whisked them away<br/>
          MB to Wisconsin and Andrew to NJ<br/>
          </pre>
          <img src={require('../../images/story/states.svg')} alt="Robot Competition"  style={{width: '12rem'}} /><pre>
          But like the Grinch before Christmas their love grew tenfold<br/>
          And before either knew it they'd earned Delta Gold<br/>
          </pre>
          <img src={require('../../images/story/gold.svg')} alt="Robot Competition"  style={{width: '15rem'}} /><pre>
          Fast forward the story to the top of Storm King<br/>
          Where Andrew gave MB a promise and ring<br/>
          "I'll love you forever, please give me your hand<br/>
          We'll grow old together, write our names in the sand" <br/>
          So join us dear friends at the chapel in June <br/>
          We'll be saying our vows cuz we're over the moon!<br/>
        </pre>
        <img src={require('../../images/story/westpoint.svg')} alt="Robot Competition"  style={{width: '25rem'}} />
      </div>
  </div>
  )
}

export default Story