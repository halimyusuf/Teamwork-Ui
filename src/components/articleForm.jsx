import React from "react";
import Form from "./common/form";
import { toast } from "react-toastify";
import { saveArticle } from "../services/postsServices";
import { getArticleSchema } from "../services/formSchema";
import { getArticle } from "../services/postsServices";

class ArticleForm extends Form {
  state = {
    data: { title: "", article: "", category: "", id: "" },
    errors: {}
  };
  async componentDidMount() {
    if (this.props.match.params.id) {
      try {
        let post = await getArticle(this.props.match.params.id);
        post = post.data.data;
        if (post) {
          const data = { ...this.state.data };
          data.title = post.title;
          data.article = post.article;
          data.category = post.category;
          data.id = post.articleId;
          this.setState({
            data
          });
        }
      } catch (error) {
        // const { response: err } = error;
        toast.error("Unexpected error");
      }
    }
  }

  schema = getArticleSchema();

  doSubmit = async () => {
    try {
      const response = await saveArticle(this.state.data);
      this.props.history.push("/");
      toast(response.data.data.message);
    } catch (error) {
      toast.error("Unexpected error");
    }
  };

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          {this.inputField("title", "Title")}
          {this.renderTextArea("article", "Write article here")}
          {this.inputField(
            "category",
            "Tag",
            "text",
            "Separate multiple tags with +"
          )}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}
export default ArticleForm;
