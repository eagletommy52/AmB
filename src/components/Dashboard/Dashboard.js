import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import ResponseCard from './ResponseCard/ResponseCard'
const getAllWeddingData = superSecret => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://rsvp.somewhataccurate.com/dashboard/${superSecret}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
export default class Dashboard extends Component {
  state = {
    superSecret: '',
    rsvpResults: '',
    modifyModal: '',
    attendeeNumbers: '',
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
              invite.color = '#FFD';
              acc[2].push(invite);
            } else {
              if (invite.attendees.every(attendee => !attendee.attending)) {
                invite.color = '#FDD';
                acc[1].push(invite);
              } else {
                invite.color = '#DFD';
                acc[0].push(invite);
              }
            }
            return acc;
          },
          [[], [], [], res.length]
        );
        let attendeeNumbers = rsvpResults[0].reduce((acc,invite)=>{
          let coming = invite.attendees.reduce((accum,attendee)=>{
            return attendee.attending?accum+1:accum},0)
          let notComing = invite.attendees.reduce((accum,attendee)=>{
            return attendee.attending?accum:accum+1},0)
          return [acc[0]+coming, acc[1]+notComing]},[0,0])
        attendeeNumbers.push(rsvpResults[1].reduce((acc,invite)=>{return acc+invite.attendees.length},0))
        attendeeNumbers.push(rsvpResults[2].reduce((acc,invite)=>{return acc+invite.attendees.length},0))
        this.setState({ 
          rsvpResults,
          attendeeNumbers
        });
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
    const attendeeNumbers = this.state.attendeeNumbers
    const [resNumYes,resNumNo, decNumNo, nonNums] = attendeeNumbers
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
              <h2><button id='refresh button' onClick={this.handleDataFetch}>Refresh{String.fromCodePoint(0x1F42F)}</button></h2>
              <h3>
                Responded Invites: {going.length + declined.length}/{totalNum}
                <br/>
                Number of People Attending: {resNumYes}
                <br/>
                Yes/No Rate: {Math.round((resNumYes/(resNumYes+resNumNo+decNumNo))*100)}%
              </h3>
            </header>

            <section className='going'>
              <h2>Responded<br/>({resNumYes}{String.fromCodePoint(0x1F44D)} {resNumNo}{String.fromCodePoint(0x1F44E)})</h2>
              {going &&
                going.map(invite => {
                  return <ResponseCard key={invite.code} invite={invite} />;
                })}
            </section>
            <section className='notgoing'>
              <h2>Declined <br/>({decNumNo}{String.fromCodePoint(0x1F44E)})</h2>
              {declined &&
                declined.map(invite => {
                  return <ResponseCard key={invite.code} invite={invite} />;
                })}
            </section>
            <section className='noresponse'>
              <h2>No Response <br/> ({nonNums}{String.fromCodePoint(0x1F937)})</h2>
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
