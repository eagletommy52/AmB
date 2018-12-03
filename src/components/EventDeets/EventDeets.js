import React from 'react';
import './EventDeets.css';

const airportList = [
  {
    Name: "LaGuardia",
    Abbr: "LGA",
    Cost: ["$",'bgGreen'],
    Time: ["60-90min", 'bgYellow']
  },
  {
    Name: "JFK Intl",
    Abbr: "JFK",
    Cost: ["$",'bgGreen'],
    Time: ["90-120min", 'bgRed']
  },
  {
    Name: "Newark",
    Abbr: "EWR",
    Cost: ["$",'bgGreen'],
    Time: ["60-90min", 'bgYellow']
  },
  {
    Name: "Stewart",
    Abbr: "SWF",
    Cost: ["$$$",'bgRed'],
    Time: ["30min", 'bgGreen']
  },
  {
    Name: "Westchester",
    Abbr: "HPN",
    Cost: ["$$$",'bgRed'],
    Time: ["60min", 'bgYellow']
  },

]
const Airport = (props) => {
  return (
    <div className="airport">
          <h4>{props.Name}
          <br/>({props.Abbr}) </h4>
          <span className={"badge " + props.Cost[1]}>{props.Cost[0]}</span>
          <span className={"badge " + props.Time[1]}>{props.Time[0]}</span>
    </div>
  )
}

const EventDeets = (props) => {
  return (
    <React.Fragment>
      <h2>Event Details</h2>
      <div className="event">
              
        <div className="wedding">
          <h3>
            Ceremony
          </h3>
          <p>
            June 1st, 2019 2:00PM<br />
            West Point Cadet Chapel<br />
            722 Derussy Rd<br /> 
            West Point, NY 10996
          </p>
          <img src={require('../../images/chapel.jpg')} alt="West Point Cadet Chapel"/>
        </div>
        <div className="reception">
          <h3>
            Reception
          </h3>
          <p>
            Following the ceremony, the cocktail hour & reception will be held at the Thayer Hotel at 4:30pm.<br />
            Thayer Hotel<br />
            674 Thayer Rd<br /> 
            West Point, NY 10996
            
          </p>
          <img src={require('../../images/thayer.jpg')} alt="Thayer Hotel"/>
        </div>
        <div className="accommodations">
          <h3>
            Accommodations
          </h3>
            <p>We have reserved a block under our names at the
            <a href="https://www.thethayerhotel.com"> Thayer Hotel</a> where the reception will be held.
            <br />
            To reserve, call the Thayer at (845) 446-4731 
            and ask reserve under the Daub/Thompson block.
              There are also a number of other hotels, bed & breakfasts and airbnb rentals available in the area
            so we would recommend looking at some of the following locations:
            </p>
            <ul>
                <li>
                    <a href="https://www.ihg.com/holidayinnexpress/hotels/us/en/fort-montgomery/ftmny/hoteldetail?cm_mmc=GoogleMaps-_-EX-_-US-_-FTMNY">Holiday Inn Express</a>
                </li>
                <li>
                    <a href="https://www.ihg.com/armyhotels/hotels/us/en/west-point/zywpa/hoteldetail">Five Star Inn</a>
                </li>
                <li>
                    <a href="https://www.ihg.com/armyhotels/hotels/us/en/west-point/zywpb/hoteldetail">Beat Navy House</a>
                </li>
                <li>
                    <a href="https://www.airbnb.com/s/Highland-Falls--NY-10928--United-States/homes">Highland Falls airbnb Rentals</a>
                </li>
            </ul>
                
        </div>
        <div className="directions">
          <h3>
            Getting There
          </h3>
          <p> 
          Guest traveling from out of town will likely want to fly into one of the following airports:<br/><br/>
          <div class="airportContainer">
            {airportList.map(airport=><Airport Name={airport.Name} Abbr={airport.Abbr} Cost={airport.Cost} Time={airport.Time}/>)}
          </div>
          <br/>
          From there most guests will rent a car, but the metro north train line can take visitors from the Manhattan to Garrison, the town directly across the Hudson from West Point.
          </p>
        </div>
      </div>
    </React.Fragment>
  )
}
export default EventDeets;