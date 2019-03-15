import React from 'react';

import { Redirect } from 'react-router-dom';


const Matcher = props => {
  return (
    <div>
      <>
        {props.location.pathname.length === 5 ? 
          <Redirect to={{
            pathname: '/rsvp',
            search: `?invite=${props.location.pathname.slice(1)}`
          }} /> : 
          //<RSVPcode code={props.location.pathname.slice(1)} /> :
          <Redirect to={{pathname: "/", state: { from: props.location }}}/>}
    </>
    </div>
  )
}

export default Matcher
