import React, { Component } from "react";
import { api } from "../services/api";

import "./New.css";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      author: "",
      place: "",
      description: "",
      hashtags: "",
      imagePreviewUrl: ""
    };
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    this.props.history.push("/");
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input id="upload" type="file" onChange={this._handleImageChange} />
        {/* <img type="image" width="300px" height="300px" src={imagePreviewUrl} /> */}
        <input
          type="image"
          width="300px"
          height="300px"
          src={imagePreviewUrl}
        />
        <input
          type="text"
          name="author"
          placeholder="Autor do post"
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="place"
          placeholder="Local do post"
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Descrição do post"
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do post"
          onChange={this.handleChange}
        />

        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default New;
