import React from 'react';
import './Party.css';
import partyMembers from './party.json'

const Avatar = (props) => {
  return (
    <div className="Avatar">
      <img src={`../../images/team/${props.pic}`} alt={props.name}/>
      <h4>{props.name}</h4>
      <p>{props.desc}</p>
    </div>
  )
}

const Party = (props) => {
  return (
    <div className="partyContainer">
      <div className="groom">
        {
          partyMembers.filter(member=>member.team==="groom").map(member=>{return <Avatar key={member.name} name={member.name} pic={member.pic} desc={member.desc}/>})
        }
      </div>
      <div className="bride">
        {
          partyMembers.filter(member=>member.team==="bride").map(member=>{return <Avatar key={member.name} name={member.name} pic={member.pic} desc={member.desc}/>})
        }
      </div>
    </div>
  )
}

export default Party;