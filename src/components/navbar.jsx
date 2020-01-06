import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;

    let username = user
      ? user.username.replace(/\s+/g, "-").toLowerCase()
      : "admin";
    return (
      <header>
        {/* <div>
          <h2>
            <NavLink to="/">
              <span id="app-name">Team</span>Work
            </NavLink>
          </h2>
        </div> */}

        <div className="white">
          <div className="top">
            <div className="left-nav">
              <NavLink to="/" className="home">
                {" "}
                <span id="app-name">Team</span>Work{" "}
              </NavLink>
              {user && (
                <React.Fragment>
                  <NavLink to="/logout" className="nav-item">
                    Logout
                  </NavLink>
                  <NavLink to={`/${username}/posts`} className="nav-item">
                    {" "}
                    My posts{" "}
                  </NavLink>
                </React.Fragment>
              )}
              {user && user.isAdmin && (
                <React.Fragment>
                  <NavLink to="/register" className="nav-item">
                    Register
                  </NavLink>
                  <NavLink to="/spam" className="nav-item">
                    Spam
                  </NavLink>
                </React.Fragment>
              )}
            </div>

            <div className="nav">
              <p className="user-name">
                <span>
                  {" "}
                  <i className="fa fa-user"></i>
                </span>
                {user && user.username}{" "}
              </p>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Navbar;
