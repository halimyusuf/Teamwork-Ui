import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./components/home";
import Navbar from "./components/navbar";
import ArticleContent from "./components/articleContent";
import ArticleForm from "./components/articleForm";
import GifForm from "./components/gifForm";
import GifContent from "./components/gifContent";
import LoginForm from "./components/loginForm";
import SignUpForm from "./components/signUpForm";
import Footer from "./components/footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./footer.css";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authServices";
import NotFound from "./components/notFound";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();
    if (user)
      this.setState({
        user
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div id="page-container">
        <ToastContainer />
        <Navbar user={user}> </Navbar>{" "}
        <div id="content-wrap">
          <Switch>
            <Route path="/sign-in" component={LoginForm} />
            <ProtectedRoute path="/logout" exact component={Logout} />
            <ProtectedRoute
              path="/"
              exact
              render={props => <Home user={user} {...props} />}
            />
            {/* delete later */}
            {user && user.isAdmin && (
              <ProtectedRoute
                path="/spam"
                render={props => <Home user={user} {...props} />}
              />
            )}

            {user && user.isAdmin && (
              <ProtectedRoute
                path="/register"
                render={props => <SignUpForm user={user} {...props} />}
              />
            )}

            <ProtectedRoute
              path="/:username?/posts"
              render={props => <Home user={user} {...props} />}
            />
            <ProtectedRoute
              path="/edit/articles/:id"
              render={props => <ArticleForm user={user} {...props} />}
            />
            <ProtectedRoute path="/article/new" component={ArticleForm} />
            <ProtectedRoute path="/gif/new" component={GifForm} />
            <ProtectedRoute
              path="/article/:id"
              render={props => <ArticleContent user={user} {...props} />}
            />
            <ProtectedRoute
              path="/gif/:id"
              render={props => <GifContent user={user} {...props} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>{" "}
        </div>{" "}
        <Footer />
      </div>
    );
  }
}

export default App;
