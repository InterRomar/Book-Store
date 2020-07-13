import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userUploadAvatar } from '../store/current_user/actions';

class FormUploadAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { userUploadAvatar } = this.props;
    const formData = new FormData();
    formData.append('myImage', this.state.file);

    try {
      await userUploadAvatar(formData);
    } catch (error) {
      console.log(error);
    }
  }

  onChange = (event) => {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" name="myImage" onChange= {this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  userUploadAvatar: avatar => dispatch(userUploadAvatar(avatar)),
});

export default connect(null, mapDispatchToProps)(FormUploadAvatar);


FormUploadAvatar.propTypes = {
  userUploadAvatar: PropTypes.func
};
