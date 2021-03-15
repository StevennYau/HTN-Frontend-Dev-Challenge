import { USER_ACTIONS, UserContext } from "../App";
import { useHistory } from "react-router";
import { useContext } from "react";

const Login = () => {
  const userContext = useContext(UserContext);
  let history = useHistory();

  // hard coded login to be successful everytime, updates user state and redirects to homepage after
  function handleClick() {
    userContext[1]({ type: USER_ACTIONS.LOGIN });
    history.push("/");
  }

  return (
    <form className="container">
      <h3>Log in</h3> 
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          required
        />
      </div>
      <div className="form-group space-lower">
        <label>Password</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter password"
          required
        />
      </div>
      <button
        onClick={handleClick}
        className="btn btn-dark btn-lg btn-block"
        type="button"
      >
        Sign in
      </button>
    </form>
  );
};

export default Login;
