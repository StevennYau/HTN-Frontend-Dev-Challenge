import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, EventsContext } from "../App";
import { useContext } from "react";
import { timeConverter, dateConverter } from "./Home";

const Info = (props) => {
  const uri =
    "https://api.hackthenorth.com/v3/graphql?query={ event(id: " +
    props.match.params.id +
    ") { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }";
  const userContext = useContext(UserContext);
  const eventContext = useContext(EventsContext);
  const [event, setEvent] = useState();

  useEffect(() => {
    console.log(userContext[0]);
    console.log(userContext[1]);
    console.log(eventContext);

    if (eventContext != null) {
      eventContext.events.map((event) => {
        if (event.id == props.match.params.id) {
          setEvent(event);
        }
      });
    }

    console.log("USER CONTEXT OF EVENTS");
    console.log(eventContext);
    console.log(event);
  }, [event, props, uri, userContext]);

  if (event) {
    console.log(props.match.params.isLoggedIn);
    console.log(event.permission);
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
              {event.speakers.length === 0 && (
                <h5 className="card-title text-center">
                  No Speakers For This Event
                </h5>
              )}
              {event.speakers.length !== 0 && (
                <div className="text-center">
                  {event.speakers[0].profile_pic != null && (
                    <img
                      className="speaker-pfp"
                      src={event.speakers[0].profile_pic}
                    />
                  )}
                  <h5 className="card-title">
                    Speaker: {event.speakers[0].name}{" "}
                  </h5>
                </div>
              )}
              <p className="card-text">{event.description}</p>
              <h5>About The Event:</h5>
              <ul>
                <li>
                  <strong>Event Type:</strong> {event.event_type}
                </li>
                {event.permission === "public" && userContext[0] && (
                  <li>
                    <strong>Link:</strong> <a href={event.private_url}>here!</a>
                  </li>
                )}
                {event.permission === "public" && !userContext[0] && (
                  <li>
                    <strong>Link:</strong> <a href={event.public_url}>here!</a>
                  </li>
                )}
                {event.permission === "private" && (
                  <li>
                    <strong>Link:</strong> <a href={event.private_url}>here!</a>
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
              </ul>
            </div>
            <div className="card-footer bg-transparent">
              <strong>Related Events:</strong>
              <ul>
              {event.related_events.map((eventId) => {
                return eventContext.events.map((events, index) => {
                  if (events.id == eventId) {
                    return (<li key={index}>{events.name}</li>)
                  }
                })
              })}
              </ul>
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
