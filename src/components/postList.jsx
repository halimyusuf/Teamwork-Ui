import React, { Component } from "react";
import PostInfo from "./common/postInfo";
import { Link } from "react-router-dom";
import { getDate } from "../utils/formatTime";
class PostList extends Component {
  state = {};
  getLink(id, bool) {
    return bool ? `/article/${id}` : `/gif/${id}`;
  }

  render() {
    const { allPosts, handleDel, handleFlag, spamPage, user } = this.props;
    return (
      <section>
        {allPosts.map(post => (
          <div key={post.id} className="a-post-list">
            <div>
              <p className="post-title">
                <span className="post-type">
                  {post.content ? "Article" : "Gif"}{" "}
                </span>{" "}
                &nbsp;
                <Link to={this.getLink(post.id, post.content)}>
                  {post.title}
                </Link>
              </p>
            </div>
            <PostInfo
              date={getDate(post.createdOn)[0]}
              time={getDate(post.createdOn)[1]}
              username={post.author}
            />

            <div className="owner-access">
              <div>
                {post.content && (
                  <div>
                    {user.id === post.authorId && (
                      <React.Fragment>
                        <Link to={`/edit/articles/${post.id}`}>
                          <i className="fa fa-edit"></i>
                        </Link>
                        <i
                          onClick={() => handleDel(post.id, "article")}
                          className="fa fa-trash"
                        ></i>
                      </React.Fragment>
                    )}
                    {spamPage && (
                      <i
                        onClick={() => handleFlag(post.id, "article")}
                        className="fa fa-flag"
                      ></i>
                    )}
                  </div>
                )}
                {post.url && (
                  <div>
                    {user.id === post.authorId && (
                      <i
                        onClick={() => handleDel(post.id, "gif")}
                        className="fa fa-trash"
                      ></i>
                    )}
                    {spamPage && (
                      <i
                        onClick={() => handleFlag(post.id, "gif")}
                        className="fa fa-flag"
                      ></i>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
}

export default PostList;
