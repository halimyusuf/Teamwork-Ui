import React from "react";
import Form from "./common/form";
import { getGifSchema } from "../services/formSchema";
import { postGif } from "../services/postsServices";
import { toast } from "react-toastify";

class GifForm extends Form {
  state = {
    data: { title: "", image: "" },
    image: "",
    errors: {}
  };

  schema = getGifSchema();

  doSubmit = async () => {
    const data = new FormData();
    data.append("image", this.state.image);
    data.append("title", this.state.data.title);
    try {
      await postGif(data);
      toast.success("GIF image successfully posted");
      this.props.history.push("/");
    } catch (error) {
      // const { response: err } = error;
      toast.error("Unexpected error");
    }
  };

  render() {
    return (
      <div className="post-form">
        <form
          onSubmit={this.handleSubmit}
          // action="http://localhost:4000/api/v1/gifs"
          // method="post"
        >
          {this.inputField("title", "Title")}
          {this.inputField("image", "Gif/Image", "file")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default GifForm;
