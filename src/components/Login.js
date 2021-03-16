import { USER_ACTIONS, UserContext } from "../App";
import { useHistory } from "react-router";
import { useContext, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);
  let history = useHistory();

  // hard coded login to be successful everytime then updates user state and redirects to homepage after
  function handleClick() {
    console.log("in handle click");
    console.log(username);
    console.log(password);
    if (username === "username" && password === "password") {
      userContext[1]({ type: USER_ACTIONS.LOGIN });
      history.push("/");
    }
  }

  // updates the current username and password variables
  function handleInput(type, input) {
    if (type === "username") {
      setUsername(input);
    }

    if (type === "password") {
      setPassword(input);
    }
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
          onChange={(input) => {
            console.log(input.target.value);
            handleInput("username", input.target.value);
          }}
        />
      </div>
      <div className="form-group space-lower">
        <label>Password</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter password"
          required
          onChange={(input) => {
            console.log(input.target.value);
            handleInput("password", input.target.value);
          }}
        />
      </div>
      <button
        onClick={handleClick}
        className="btn btn-dark btn-lg btn-block"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
};

export default Login;
