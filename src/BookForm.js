import React, { Component } from "react";
import { connect } from "react-redux";
import { postBook, resetErrors } from "./redux/actions/index";

class BookForm extends Component {
  state = {
    title: "",
    color: "",
    authors: [this.props.author.id]
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.resetErrors();
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitBook = event => {
    event.preventDefault();
    this.props.postBook(this.state, this.props.closeModal);
  };

  render() {
    const { errors } = this.props;
    const colors = ["white", "black", "red", "blue"];
    const colorSelection = colors.map(color => (
      <option value={color}>{color}</option>
    ));
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitBook}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              value={this.state.title}
              onChange={this.changeHandler}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select
              className="custom-select"
              onChange={this.changeHandler}
              name="color"
              value={colors[0]}
            >
              {colorSelection}
            </select>
          </div>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errorsState.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (newBook, closeModal) => dispatch(postBook(newBook, closeModal)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
