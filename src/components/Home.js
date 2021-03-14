import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

 // unix converter for time
 export function timeConverter(UNIX_timestamp) {
  let unix_timestamp = UNIX_timestamp;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // get AM or PM using moment js
  let result = moment(UNIX_timestamp).format("A");
  // Will display time in 10:30 AM/PM format
  var formattedTime = hours + ":" + minutes.substr(-2) + " " + result;
  return formattedTime;
};

// unix converter for date
export function dateConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = month + " " + date + ", " + year;
  return time;
};


const Home = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  // sort events based on start time
  const sortEvents = () => {
    props.eventInfo.events.sort(function (x, y) {
      return x.start_time - y.start_time;
    });
  };

  if (props.eventInfo) {
    //only render if props.eventInfo is populated
    sortEvents();    
    return (
      <div className="container">
        <div className="container d-flex justify-content-center">
          <h1>Events</h1>
        </div>
        <div>
          <form className="form-group">
            <input
              type="text"
              className="form-control "
              placeholder="Search Event Names..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </form>
        </div>

        {props.eventInfo.events
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val;
            }
          })
          .map((event, index) => {
            return (
              <div key={index} className="card mb-4 border-secondary">
                <div className="card-header font-weight-bold center">
                  {event.name}
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    {dateConverter(event.start_time)}: {" "}
                    {timeConverter(event.start_time)} to{" "}
                    {dateConverter(event.end_time)}:{" "}
                    {timeConverter(event.end_time)} EST
                  </h5>
                  <p className="card-text">{event.description}</p>
                  <Link to={`/info/${event.id}/${props.isLoggedIn}`} className="btn btn-outline-secondary">
                    Learn More
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    );
  } else {
    //if props.eventInfo is not populated, do not render anything
    return null;
  }
};

export default Home;
