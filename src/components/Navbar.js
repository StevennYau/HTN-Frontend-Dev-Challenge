import { Link } from "react-router-dom";
import { USER_ACTIONS, UserContext } from "../App";
import { useContext } from "react";

const Navbar = () => {
  const userContext = useContext(UserContext);

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand logo" to="/">
        Hackathon Global Inc
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      ></div>
      {userContext[0] === false && (
        <Link className="float-right" to="/login">
          <button className="btn btn-secondary">Login</button>
        </Link>
      )}
      {userContext[0] === true && (
        <Link className="float-right" to="/">
          <button
            className="btn btn-secondary"
            onClick={() => userContext[1]({ type: USER_ACTIONS.LOGOUT })}
          >
            Log Out
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
