import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Info = (props) => {
  const uri =
    "https://api.hackthenorth.com/v3/graphql?query={ event(id: " +
    props.match.params.id +
    ") { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }";
  const [event, setEvent] = useState();

  useEffect(() => {
    axios
      .get(`${uri}`)
      .then((res) => {
        if (event == null) {
          // only update if event is empty
          setEvent(res.data.data);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [event, props, uri]);

  if (event) {
    console.log(props.match.params.isLoggedIn);
    console.log(event.event.permission);
    if (
      props.match.params.isLoggedIn === "false" &&
      event.event.permission === "private"
    ) {
      return (
        <div>
          <h1 className="container d-flex justify-content-center">
            Please login to view this private event
          </h1>
          <div className=" d-flex justify-content-center">
             <Link to="/"><button>Go Back</button></Link>
          </div>
          
        </div>
      );
    } else {
      return (
        <div>
          {props.match.params.isLoggedIn} and
          {props.match.params.id} dflgksjd;lkfg
        </div>
      );
    }
  } else {
    return null;
  }
};

export default Info;
