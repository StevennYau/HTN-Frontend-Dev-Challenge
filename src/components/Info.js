import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, EventsContext } from "../App";
import { useContext } from "react";
import { timeConverter, dateConverter } from "./Home";

const Info = (props) => {
  const userContext = useContext(UserContext);
  const eventContext = useContext(EventsContext);
  const [event, setEvent] = useState();

  useEffect(() => {
    if (eventContext != null) {
      eventContext.events.map((event) => {
        if (event.id == props.match.params.id) {
          setEvent(event);
        }
      });
    }
  }, [event, props, userContext]);

  if (event) {
    if (
      props.match.params.isLoggedIn === "false" &&
      event.permission === "private"
    ) {
      return (
        <div>
          <h1 className="container d-flex justify-content-center">
            Please login to view this private event
          </h1>
          <div className=" d-flex justify-content-center">
            <Link to="/">
              <button>Go Back</button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="card border-secondary">
            <div className="card-header font-weight-bold text-center">{event.name}</div>
            <div className="card-body">
            <h5>About The Event:</h5>
              <p className="card-text">{event.description}</p>
              <ul>
                <li> 
                  <strong>Event Type:</strong> {event.event_type}
                </li>
                {event.permission === "public" && userContext[0] && (
                  <li>
                    <strong>Private Link:</strong> <a href={event.private_url}>here!</a>
                  </li>
                )}
                {event.permission === "public" && userContext[0] && (
                  <li>
                    <strong>Public Link:</strong> <a href={event.public_url}>here!</a>
                  </li>
                )}
                {event.permission === "public" && !userContext[0] && (
                  <li>
                    <strong>Link:</strong> <a href={event.public_url}>here!</a>
                  </li>
                )}
                {event.permission === "private" && (
                  <li>
                    <strong>Private Link:</strong> <a href={event.private_url}>here!</a>
                  </li>
                )}
                {event.permission === "private" && (
                  <li>
                    <strong>Public Link:</strong> <a href={event.public_url}>here!</a>
                  </li>
                )}
                <li> 
                  <strong>Start Time:</strong> {dateConverter(event.start_time)}
                  : {timeConverter(event.start_time)}
                </li>
                <li>
                  <strong>End Time:</strong> {dateConverter(event.end_time)}:{" "}
                  {timeConverter(event.end_time)}
                </li>
                {event.speakers.length === 0 && (
                <li>
                  No Speakers For This Event
                </li>
              )}
              {event.speakers.length !== 0 && (
                  <li>
                    <strong>Speaker:</strong> {event.speakers[0].name}{" "}
                    
                  </li>
              )}
              {(event.speakers.length !== 0 && event.speakers[0].profile_pic != null) && (
                    <img
                      className="speaker-pfp"
                      src={event.speakers[0].profile_pic}
                    />
                  )}
              </ul>
            <div className="card-footer bg-transparent">
              <strong>Related Events:</strong>
              <ul>
              {event.related_events.map((eventId) => {
                return eventContext.events.map((events, index) => {
                  if (events.id == eventId) {
                    return (<li key={index}><Link to={`/info/${events.id}/${userContext[0]}`}>{events.name}</Link></li>)
                  }
                })
              })}
              </ul>
            </div>
          </div>
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
};

export default Info;
