import React from 'react';
import './Registry.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';
library.add(faAmazon);

const Registry = props => {
  return (
    <React.Fragment>
      <h2>Registry</h2>
      <p>
        We are so happy that you’ll be able to join us for our wedding. While the presence
        of your company is the only gift we could ever ask for, if you'd like to add
        anything else we are currently saving up for our dream honeymoon in August, or
        feel free to browse the registry links below:
      </p>
      <div className='registry'>
        <a href='https://www.honeyfund.com/wedding/AndrewMarriesBeth'>
          <img alt='Honeyfund' src={'../../images/honeyfund.png'} width='135px' />
          <br />
          Honeyfund
        </a>
        <a href='https://smile.amazon.com/wedding/share/AndrewMarriesBeth'>
          <FontAwesomeIcon size='5x' icon={['fab', 'amazon']} />
          <br />
          Amazon
        </a>
        <a href='https://www.macys.com/wgl/registry/guest/6869695'>
          <img alt='Macys' src={'../../images/Macys_logo.svg'} width='200px' />
          <br />
          Macys
        </a>
        <a href='http://www.rei.com/GiftRegistryDetails/GR152957214?cm_mmc=gift_reg-_-Wedding-_-announce-_-02Dec2018'>
          <img alt='REI' src={'../../images/REI-Logo.png'} width='200px' />
          <br />
          REI
        </a>
      </div>
    </React.Fragment>
  );
};
export default Registry;
