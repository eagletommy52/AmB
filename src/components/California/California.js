import React, { Component } from 'react'
import axios from 'axios';
import '../RSVP/RSVP.css';

const sendRSVPBack = invite => {
  return new Promise((resolve, reject) => {
    //`https://rsvp.somewhataccurate.com/rsvp/cali`
    axios
      .post(`https://rsvp.somewhataccurate.com/rsvp/cali`, invite, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(result => {
        result.data.success ? resolve({success:true}) : reject();
      })
      .catch(err => {
        reject(err);
      });
  });
};

export class California extends Component {
  state = {
    name: '',
    guests: 1,
  }
  handleInput = e => {
    const nameIndex = e.target.name;
    const nameValue = e.target.value;
    this.setState(prevState => {
      prevState[nameIndex] = nameValue;
      return prevState;
    });
  }
  handleRSVPSubmit = e => {
    e.preventDefault();
    if(this.state.guestName){
      sendRSVPBack(this.state).then(result => {
        this.setState({response:'RSVP successfully sent!  We look forward to seeing you there'});
        document.getElementById('subButton').setAttribute('disabled', true)
        document.getElementById('decButton').setAttribute('disabled', true)
      });
    } else {
      this.setState({response:'Please enter a name to submit'})
    }
    
  };
  handleRSVPDecline = e => {
    e.preventDefault();
    if(this.state.guestName){
      this.setState({count:0},()=>{
        sendRSVPBack(this.state).then(result => {
          this.setState({response:'Sorry you couldn\'t come--you\'ll be there in our thoughts!'});
          document.getElementById('subButton').setAttribute('disabled', true)
          document.getElementById('decButton').setAttribute('disabled', true)
        });
      })
      
    } else {
      this.setState({response:'Please enter a name to submit'})
    }
    
  };
  render() {
    return (
      <div
        className='bgHero'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
          <div className='rsvpContainer' style={{
          textAlign: 'center'
        }}>
        <>
          <h1>
          California Reception
          </h1>
          In celebration of their wedding on June 1st, 2019, Mary Beth and Andrew are having a reception for all their West Coast friends and family at 2:00PM, Saturday, July 27th 2019 at the Seaver House, 305 North College Avenue, Claremont, CA.  Children of all ages are welcome, and dress code is dressy casual.  If you would like to attend, please kindly enter your name(s) and guest count below, if not, please just let us know with your name and click the decline button below!<br/>
          <form>
          Name:<input required name="guestName" id="guestNameInput" type="text" onChange={this.handleInput}/><br/>
          Guests: <input type="number" defaultValue="1" onChange={this.handleInput} min="0" name="count" id="guestCountInput"/><br/>
          
          <button id="subButton" style={{cursor:'default'}} onClick={this.handleRSVPSubmit}>Submit</button> <button id="decButton" style={{cursor:'default'}} onClick={this.handleRSVPDecline}>Decline</button> <br/>
          </form>
          {this.state.response?this.state.response:null}

        </>
      </div>
        </div>
    )
  }
}

export default California
