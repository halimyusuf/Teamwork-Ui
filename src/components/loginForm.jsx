import React from "react";
import Form from "./common/form";
import auth, { loginWithJwt } from "../services/authServices";
import { getLoginSchema } from "../services/formSchema";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = getLoginSchema();

  async doSubmit() {
    try {
      const response = await auth.login(this.state.data);
      loginWithJwt(response.headers["tw-auth-token"]);
      window.location = "/";
    } catch (error) {
      const { response: err } = error;
      let errors = { ...this.state.errors };
      if (err) {
        if (err.status === 404 && err.data.error === "Incorrect email") {
          errors.email = "Incorrect email";
          return this.setState({
            errors
          });
        } else if (
          err.status === 400 &&
          err.data.error === "Incorrect password"
        ) {
          errors.password = "Incorrect password";
          return this.setState({
            errors
          });
        }
      }
      toast.error("Unexpected error");
    }
  }

  render() {
    return (
      <div className="login-form">
        <div className="form-head">
          <h4>Login</h4>
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.inputField("email", "Email")}
          {this.inputField("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
