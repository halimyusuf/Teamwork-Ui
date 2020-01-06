import React from "react";
import PostInfo from "./common/postInfo";
import Form from "./common/form";
import { getCommentSchema } from "../services/formSchema";
import { articleComment, gifComment } from "../services/postsServices";
import { toast } from "react-toastify";
import { getDate } from "../utils/formatTime";
class Comment extends Form {
  state = {
    data: { comment: "" },
    errors: {}
  };

  async doSubmit() {
    const { data: comment } = this.state;
    try {
      let response;
      if (this.props.articleId)
        response = await articleComment(this.props.articleId, comment);
      else response = await gifComment(this.props.gifId, comment);
      this.setState({
        data: { comment: "" }
      });
      this.props.handleComment(response.data.data);
    } catch (error) {
      // const { response: err } = error;
      toast.error("Unexpected error");
    }
  }

  schema = getCommentSchema();

  render() {
    const { comments } = this.props;
    return (
      <React.Fragment>
        <div className="new_comment">
          <form action="" onSubmit={this.handleSubmit}>
            {this.renderTextArea("comment", "Write comment here.")}
            {this.renderButton("Submit")}
          </form>
        </div>
        <div className="comments">
          {comments.map(comment => (
            <div key={comment.id}>
              <div className="user_avatar">
                <img
                  src="https://images.unsplash.com/photo-1530982011887-3cc11cc85693?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60"
                  alt=" "
                />
              </div>
              <div className="comment_body">
                <p>{comment.comment}</p>
              </div>
              <PostInfo
                time={getDate(comment.createdOn)[1]}
                date={getDate(comment.createdOn)[0]}
                username={comment.author}
              />
            </div>
          ))}

          <div className="user_avatar">
            <img
              src="https://images.unsplash.com/photo-1530982011887-3cc11cc85693?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60"
              alt=" "
            />
          </div>
          <div className="comment_body">
            <p>
              Gastropub cardigan jean shorts, kogi Godard PBR&B lo-fi locavore.
              Organic chillwave vinyl Neutra. Bushwick Helvetica cred freegan,
              crucifix Godard craft beer deep v mixtape cornhole Truffaut master
              cleanse pour-over Odd Future beard. Portland polaroid iPhone.
            </p>
          </div>
          <PostInfo time="17:37" date="04/11/2019" username="halim yusuf" />

          <div className="user_avatar">
            <img
              src="https://images.unsplash.com/photo-1530982011887-3cc11cc85693?ixlib=rb-1.2.1&dpr=1&auto=format&fit=crop&w=416&h=312&q=60"
              alt=" "
            />
          </div>
          <div className="comment_body">
            <p>
              Gastropub cardigan jean shorts, kogi Godard PBR&B lo-fi locavore.
              Organic chillwave vinyl Neutra. Bushwick Helvetica cred freegan,
              crucifix Godard craft beer deep v mixtape cornhole Truffaut master
              cleanse pour-over Odd Future beard. Portland polaroid iPhone.
            </p>
          </div>
          <PostInfo time="17:37" date="04/11/2019" username="halim yusuf" />
        </div>
      </React.Fragment>
    );
  }
}

export default Comment;
