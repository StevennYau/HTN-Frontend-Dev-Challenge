import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, EventsContext } from "../App";
import { timeConverter, dateConverter } from "./Home";

const Info = (props) => {
  const userContext = useContext(UserContext);
  const eventContext = useContext(EventsContext);
  const [event, setEvent] = useState();

  // change the formatting of the event type before rendering
  const displayEvent = (event_type) => {
    if (event_type === "workshop") {
      return "Workshop";
    } else if (event_type === "activity") {
      return "Activity";
    } else {
      return "Tech Talk";
    }
  };

  useEffect(() => {
    if (eventContext != null) {
      eventContext.events.map((event) => {
        if (event.id == props.match.params.id) {
          setEvent(event);
        }
      });
    }
  }, [event, props, userContext]);

  // if the event information is populated, then render
  if (event) {
    //if a user that is not logged in tries to access a private event, tell them to log in
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
      // if a logged in user accesses a private event, or a user accesses a public event, render event information
    } else {
      return (
        <div className="container">
          <div className="card border-secondary">
            <div className="card-header font-weight-bold text-center">
              {event.name}
            </div>
            <div className="card-body">
              <h5>About The Event:</h5>
              <p className="card-text">{event.description}</p>
              <ul>
                <li>
                  <strong>Event Type:</strong> {displayEvent(event.event_type)}
                </li>
                {event.permission === "public" && userContext[0] && (
                  <li>
                    <strong>Private Link:</strong>{" "}
                    <a href={event.private_url}>here!</a>
                  </li>
                )}
                {event.permission === "public" && userContext[0] && (
                  <li>
                    <strong>Public Link:</strong>{" "}
                    <a href={event.public_url}>here!</a>
                  </li>
                )}
                {event.permission === "public" && !userContext[0] && (
                  <li>
                    <strong>Link:</strong> <a href={event.public_url}>here!</a>
                  </li>
                )}
                {event.permission === "private" && (
                  <li>
                    <strong>Private Link:</strong>{" "}
                    <a href={event.private_url}>here!</a>
                  </li>
                )}
                {event.permission === "private" && (
                  <li>
                    <strong>Public Link:</strong>{" "}
                    <a href={event.public_url}>here!</a>
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
                  <li>No Speakers For This Event</li>
                )}
                {event.speakers.length !== 0 && (
                  <li>
                    <strong>Speaker:</strong> {event.speakers[0].name}{" "}
                  </li>
                )}
                {event.speakers.length !== 0 &&
                  event.speakers[0].profile_pic != null && (
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
                        return (
                          <li key={index}>
                            <Link to={`/info/${events.id}/${userContext[0]}`}>
                              {events.name}
                            </Link>
                          </li>
                        );
                      }
                    });
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // if the events information is not yet populated, do not render anything yet
  } else {
    return null;
  }
};

export default Info;
