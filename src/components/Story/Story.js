import React from 'react';
import './Story.css';

function Story (props) {
  return (
    <div className='Story'>
      <img scr={require('../../images/mbandrew.png')} alt="Phones buzzing" style={{float: 'left'}}/>
      <p>
        On a warm summer night in June of 15
        Two phones buzzed at once as a match lit the screen 
        A cadet and a chemist, what an unlikely match
        Little did they know they'd met quite a catch
        Their first date was spent watching robots compete
        They closed out the night with an ice-creamy treat
  
        Before they both knew it they were stealing weekends
        And by summer's end they were boy and girlfriend
  
        But as oft does happen, life whisked them away
        MB to Wisconsin and Andrew to NJ
        But like the Grinch before Christmas their love grew tenfold
        And before either knew it they'd earned Delta Gold
  
        Fast forward the story to the top of Storm King
        Where Andrew gave MB a promise and ring
        "I'll love you forever, please give me your hand
        We'll grow old together, write our names in the sand" 
        So join us dear friends at the chapel in June 
        We'll be saying our vows cuz we're over the moon!
      </p>
    </div>
  )
}

export default Story