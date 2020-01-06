import React from "react";
import Form from "./common/form";
import auth from "../services/authServices";
import {
  getJobroles,
  getDepartments,
  getGender
} from "../services/signUpServices";
import { getSignUpSchema } from "../services/formSchema";
import { toast } from "react-toastify";

class SignUpForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      gender: "",
      jobRole: "",
      department: ""
    },
    errors: {}
  };
  options = {
    gender: getGender(),
    department: getDepartments(),
    jobRole: getJobroles()
  };

  schema = getSignUpSchema();

  async doSubmit() {
    try {
      await auth.register(this.state.data);
      this.props.history.push("/");
    } catch (error) {
      const { response: err } = error;
      if (err.status === 400 && err.data.error === "User with email exists") {
        let errors = { ...this.state.errors };
        errors.email = "User with email exists";
        return this.setState({
          errors
        });
      }
      toast.error("Unexpected error");
    }
  }

  render() {
    return (
      <div className="login-form">
        <div className="form-head">
          <h4>Register</h4>
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.inputField("firstName", "Firstname")}
          {this.inputField("lastName", "Lastname")}
          {this.inputField("email", "Email")}
          {this.inputField("password", "Password", "password")}
          {this.inputField("address", "Address")}
          {this.selectField("gender", "Gender", this.options.gender)}
          {this.selectField("jobRole", "Job role", this.options.jobRole)}
          {this.selectField(
            "department",
            "Department",
            this.options.department
          )}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default SignUpForm;
