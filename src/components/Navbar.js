import { Link } from "react-router-dom";
import { USER_ACTIONS } from "../App";

const Navbar = (props) => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand logo" to="/">
        Hack The North
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
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {props.isLoggedIn === false && 
          <Link className="pull-right" to="/login">
            <button>Login</button>
          </Link>
        }
        {props.isLoggedIn === true && 
          <Link className="pull-right" to="/">
            <button onClick={() => props.dispatch({ type: USER_ACTIONS.LOGOUT })} >Log Out</button>
          </Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
