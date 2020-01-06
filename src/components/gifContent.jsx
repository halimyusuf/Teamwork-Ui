import React, { Component } from "react";
// import gif from "./giphy.gif";
import Comment from "./comments";
import PostInfo from "./common/postInfo";
import { getGif } from "../services/postsServices";
import { toast } from "react-toastify";
import { getDate } from "../utils/formatTime";

class GifContent extends Component {
  state = {
    post: {},
    comments: []
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const response = await getGif(id);
      this.setState({
        post: response.data.data,
        comments: response.data.data.comments
      });
    } catch (error) {
      // const { response: err } = error;
      toast.error("unexpected error");
    }
  }

  handleComment = comment => {
    let comments = [comment, ...this.state.comments];
    this.setState({
      comments
    });
  };

  render() {
    const { post, comments } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div className="gif-post">
          <p>{post.title}</p>
          <img src={post.url} alt=" "></img>
          <PostInfo
            time={getDate(post.createdOn)[1]}
            date={getDate(post.createdOn)[0]}
            username={user && user.username}
          />
        </div>
        <div className="all-comments">
          <h5>Comments</h5>
          <Comment
            handleComment={this.handleComment}
            comments={comments}
            gifId={post.id}
          />
        </div>
      </div>
    );
  }
}

export default GifContent;
