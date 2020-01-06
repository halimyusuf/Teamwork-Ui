import React, { Component } from "react";
import { toast } from "react-toastify";
import Comment from "./comments";
import { getArticle } from "../services/postsServices";
import PostInfo from "./common/postInfo";

class ArticleContent extends Component {
  state = {
    post: {},
    comments: []
  };

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const response = await getArticle(id);
      this.setState({
        post: response.data.data,
        comments: response.data.data.comments
      });
    } catch (error) {
      toast("Unexpected error");
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
        <article>
          <h3>{post.title}</h3>
          <p>{post.article}</p>
        </article>

        <PostInfo
          time={post.createdOn}
          date="04/11/2019"
          username={user && user.username}
        />

        {/* {comment section} */}

        <div className="all-comments">
          <h5>Comments</h5>
          <Comment
            handleComment={this.handleComment}
            comments={comments}
            articleId={post.articleId}
          />
        </div>
      </div>
    );
  }
}

export default ArticleContent;
