import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
const getAllWeddingData = superSecret => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://rsvp.somewhataccurate.com/dashboard/${superSecret}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
const ResponseCard = props => {
  const { attendeesAuth, phone, attendees, color } = props.invite;
  return (
    <div className='responseCard' style={{ backgroundColor: color }}>
      <div>
        {attendees.map((attendee, i, arr) => {
          return (
            <div key={attendee._id}>
              {props.invite.responded&&(attendee.attending?String.fromCodePoint(0x1F44D):String.fromCodePoint(0x1F44E))}{attendee.firstName} {attendee.lastName} {i + 1 === arr.length ? '' : ' &'}
              <br />
            </div>
          );
        })}
      </div>
      <div className="responseData">
        <div>{phone ? `Phone: ${phone}` : ''}</div>
        <div><strong>{attendees.reduce((acc, attendee)=>{return acc+attendee.attending},0)}/{attendeesAuth} Attending</strong><br/>From: {props.invite.city}</div>
      </div>
    </div>
  );
};
export default class Dashboard extends Component {
  state = {
    superSecret: '',
    rsvpResults: '',
    modifyModal: '',
  };
  handleSecretInput = e => {
    this.setState({
      [e.target.name]: [e.target.value],
    });
  };
  handleDataFetch = e => {
    e.target.disabled = true;
    e.persist();
    getAllWeddingData(this.state.superSecret)
      .then(res => {
        if(e.target){e.target.disabled = false};
        let rsvpResults = res.reduce(
          (acc, invite) => {
            if (!invite.responded) {
              invite.color = '#FDD';
              acc[2].push(invite);
            } else {
              if (invite.attendees.every(attendee => attendee.attending)) {
                invite.color = '#DFD';
                acc[0].push(invite);
              } else {
                invite.color = '#FFD';
                acc[1].push(invite);
              }
            }
            return acc;
          },
          [[], [], [], res.length]
        );
        this.setState({ rsvpResults: rsvpResults });
        //console.log(rsvpResults);
      })
      .catch(err => {
        e.target.disabled = false;
        this.setState({
          error: true,
        });
        setTimeout(() => this.setState({ error: false }), 5000);
      });
  };
  
  render() {
    const rsvpResults = this.state.rsvpResults;
    const [going, declined, nonresponders, totalNum] = rsvpResults;
    return (
      <div className='dashboard'>
        {!rsvpResults && (
          <div className='dashboardContainer'>
            <div>
              <label style={{ textAlign: 'center' }} htmlFor='superSecret'>
                Secret Word:
              </label>
              <br />
              <input
                name='superSecret'
                type='text'
                id='superSecret'
                onChange={this.handleSecretInput}
              />
            </div>
            <button id='secretButt' onClick={this.handleDataFetch}>
              Submit
            </button>
            {this.state.error ? (
              <>
                <h3>Uhh...that's not right...</h3>
                <img
                  alt='no no no'
                  src='https://media.giphy.com/media/1zSz5MVw4zKg0/giphy.gif'
                />
              </>
            ) : (
              ''
            )}
          </div>
        )}
        {rsvpResults && (
          <div className='respondentsContainer'>
            <header className='header'>
              <h2>Results <button id='refresh button' onClick={this.handleDataFetch}>Refresh{String.fromCodePoint(0x1F42F)}</button></h2>
              <h3>
                Respondents: {going.length + declined.length}/{totalNum}
              </h3>
            </header>

            <section className='going'>
              <h2>Responded ({going.reduce((acc,invite)=>{return acc+invite.attendees.length},0)}{String.fromCodePoint(0x1F44D)})</h2>
              {going &&
                going.map(invite => {
                  return <ResponseCard key={invite.code} invite={invite} />;
                })}
            </section>
            <section className='notgoing'>
              <h2>Declined ({
                declined.reduce((acc,invite)=>{
                let coming = invite.attendees.reduce((accum,attendee)=>{
                  return attendee.attending?accum+1:accum},0)
                return acc+coming},0)}{String.fromCodePoint(0x1F44D)})</h2>
              {declined &&
                declined.map(invite => {
                  return <ResponseCard key={invite.code} invite={invite} />;
                })}
            </section>
            <section className='noresponse'>
              <h2>No Response</h2>
              {nonresponders &&
                nonresponders.map(invite => {
                  return <ResponseCard key={invite.code} invite={invite} />;
                })}
            </section>
          </div>
        )}
      </div>
    );
  }
}
