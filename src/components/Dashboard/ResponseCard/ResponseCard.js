import React from 'react'

const ResponseCard = props => {
  const { attendeesAuth, phone, attendees, color } = props.invite;
  return (
    <div className='responseCard' style={{ backgroundColor: color }}>
      <div>
        {attendees.map((attendee, i, arr) => {
          return (
            <div key={attendee._id}>
              {props.invite.responded&&(attendee.attending?String.fromCodePoint(0x1F44D):String.fromCodePoint(0x1F44E))}{attendee.amendedName} {i + 1 === arr.length ? '' : ' &'}
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

export default ResponseCard
