import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import './RSVP.css';

const getInviteWithCode = code => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://rsvp.somewhataccurate.com/rsvp/retrieveInvite?invite=${code}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const sendRSVPBack = invite => {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://rsvp.somewhataccurate.com/rsvp/respondInvite`, invite, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(result => {
        result.data.msg ? resolve() : reject();
      })
      .catch(err => {
        reject(err);
      });
  });
};

const RsvpCard = props => {
  return (
    <div
      className='bgHero'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
      <br />
      <div className='rsvpContainer'>
        <>
          <h1>
            {props.title}
            {props.title ? <br /> : ''}
          </h1>

          {props.body}

          <h4>{props.customMsg}</h4>

          {props.buttonLinks.map(button => {
            return (
              <Link
                key={button.text}
                style={{ textDecoration: 'none' }}
                to={`/rsvp/${button.link}`}>
                <button>{button.text}</button>
              </Link>
            );
          })}
          {props.footer}
        </>
      </div>
    </div>
  );
};

export class RSVP extends Component {
  state = {
    code: queryString.parse(this.props.location.search).invite,
    codeIsInvalid: false,
    invite: null,
  };
  componentDidMount() {
    getInviteWithCode(this.state.code)
      .then(invite => {
        //console.log(invite)
        if (invite.error) {
          this.setState(prevState => {
            return { codeIsInvalid: invite.error };
          });
        } else {
          this.setState(prevState => {
            return { invite: invite };
          });
        }
      })
      .catch(err => console.log(err));
  }
  handleCheckChange = e => {
    const personIndex = e.target.name;
    const checked = e.target.checked;
    this.setState(prevState => {
      prevState.invite.attendees[personIndex].attending = checked;
      return prevState;
    });
  };
  handleNameChange = e => {
    const nameIndex = e.target.name;
    const nameValue = e.target.value;
    this.setState(prevState => {
      prevState.invite.attendees[nameIndex].amendedName = nameValue;
      return prevState;
    });
  };
  handlePhoneChange = e => {
    const phoneNo = e.target.value;
    this.setState(prevState => {
      prevState.invite.phone = phoneNo;
      return prevState;
    });
  };
  handleNewCodeInput = e => {
    this.setState({
      code: e.target.value,
    });
  };
  handleRedirectSubmit = () => {
    this.props.history.push(`/${this.state.code}`);
  };
  handleRSVPSubmit = e => {
    e.preventDefault();
    sendRSVPBack(this.state.invite).then(result => {
      this.props.history.push(`/rsvp/success`);
    });
  };
  handleDeclineRSVP = () => {
    //console.log('declining....')
    this.setState(
      prevState => {
        prevState.invite.attendees.forEach(att => (att.attending = false));
        //console.log(prevState)
        return prevState;
      },
      updatedState =>
        sendRSVPBack(updatedState)
          .then(this.props.history.push(`/rsvp/decline`))
          .catch(err => console.log(err))
    );
  };
  render() {
    //So below are all the possible card states for initial rsvp landing, accept/send, reject, etc
    return (
      <div
        className='bgHero'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh',
        }}>
        <br />
        {this.state.invite && (
          <Route
            exact
            path='/rsvp'
            render={() => {
              return (
                <RsvpCard
                  title={
                    'Welcome ' +
                    this.state.invite.attendees[0].firstName +
                    (this.state.invite.attendees[1]
                      ? ' & ' + this.state.invite.attendees[1].firstName
                      : '') +
                    '!'
                  }
                  body={
                    <h3>
                      We kindly request the honour of your presence at our wedding on June
                      1st, 2019
                    </h3>
                  }
                  customMsg={
                    this.state.invite.customMsg ? this.state.invite.customMsg : ''
                  }
                  buttonLinks={[{ link: 'accept', text: 'Kindly Accept' }]}
                  footer={
                    <button onClick={this.handleDeclineRSVP}>Regretfully Decline</button>
                  }
                />
              );
            }}
          />
        )}

        {this.state.invite && (
          <Route
            path='/rsvp/accept'
            render={() => {
              return (
                <RsvpCard
                  title={'Wonderful!'}
                  body={
                    <h3>
                      We have reserved {this.state.invite.attendeesAuth} seats for your
                      presence
                      <form onSubmit={this.handleRSVPSubmit}>
                        <table style={{ margin: '0 auto' }}>
                          <tbody>
                            <tr>
                              <td>Attending?</td>
                              <td>Name</td>
                            </tr>
                            {this.state.invite.attendees.map((person, i) => {
                              return (
                                <tr key={person._id}>
                                  <td className='centeredChecks'>
                                    <label className='control control--checkbox'>
                                      <input
                                        name={i}
                                        onChange={this.handleCheckChange}
                                        checked={this.state.invite.attendees[i].attending}
                                        type='checkbox'
                                      />
                                      <div className='control__indicator' />
                                    </label>
                                  </td>
                                  <td>
                                    <input
                                      name={`${i}`}
                                      id={person._id}
                                      onChange={this.handleNameChange}
                                      type='text'
                                      value={this.state.invite.attendees[i].amendedName}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                            <tr>
                              <td colSpan='2'>
                                Phone Number
                                <br />
                                <input
                                  type='phone'
                                  name='phone'
                                  onChange={this.handlePhoneChange}
                                  value={this.state.invite.phone}
                                  id='invitePhone'
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <button id='rsvpSubmitButton'>Submit</button>
                      </form>
                    </h3>
                  }
                  buttonLinks={[]}
                />
              );
            }}
          />
        )}
        {this.state.invite && (
          <Route
            path='/rsvp/decline'
            render={() => {
              return (
                <RsvpCard
                  title={''}
                  body={
                    <h3>
                      So sorry you can't attend--you'll be there in our hearts!
                      <br />
                    </h3>
                  }
                  buttonLinks={[
                    { link: `?invite=${this.state.code}`, text: 'Wait Go Back!' },
                  ]}
                  footer={
                    <Link style={{ textDecoration: 'none' }} to={`/`}>
                      <button>Back to AndrewMarriesBeth.com</button>
                    </Link>
                  }
                />
              );
            }}
          />
        )}
        {this.state.invite && (
          <Route
            path='/rsvp/success'
            render={() => {
              return (
                <RsvpCard
                  title={'All Set!'}
                  body={'If anything changes click below to go back'}
                  buttonLinks={[{ link: `accept`, text: 'Change my RSVP' }]}
                  footer={
                    <Link style={{ textDecoration: 'none' }} to={`/`}>
                      <button>Back to AndrewMarriesBeth.com</button>
                    </Link>
                  }
                />
              );
            }}
          />
        )}
        <>
          {!this.state.invite && this.state.codeIsInvalid ? (
            <>
              <RsvpCard
                title={'Greetings Friend!'}
                body={
                  <>
                    <h3>
                      Thanks for visiting our website to RSVP--to simplify getting
                      responses from our friends and family, we've sent out invitations
                      with individualized links that will pull up your personalized RSVP
                      and send your response right back to us! The links inside the invite
                      should be in the format www.andrewmarriesbeth.com/ABCD (your invite
                      will have a unique four digit code to visit). If something isn't
                      working correctly or you've lost your RSVP, no sweat! Just give
                      Andrew or Mary Beth a call and we'll get you marked down. Thanks for
                      visiting we hope to hear from you soon!
                      <br />
                      XOXOXO,
                      <br />
                      Andrew & Mary Beth
                    </h3>
                  </>
                }
                buttonLinks={[]}
                footer={
                  <div className='footerCenter'>
                    <p>{this.state.codeIsInvalid}</p>
                    <input
                      type='text'
                      className='footerCenter'
                      id='newCodeInput'
                      value={this.state.code}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          this.handleRedirectSubmit();
                        }
                      }}
                      onChange={this.handleNewCodeInput}
                    />
                    <br />
                    <button onClick={this.handleRedirectSubmit}>Submit</button>
                  </div>
                }
              />
            </>
          ) : (
            ''
          )}

          {!this.state.invite && !this.state.codeIsInvalid && (
            <div className='rsvpContainer'>
              <img
                src='../../images/heartLoader.svg'
                alt='Loading Spinner'
                style={{ opacity: 0.7 }}
              />
              <br />
              Loading...
            </div>
          )}
        </>
      </div>
    );
  }
}

export default RSVP;
