import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { userUploadAvatar } from '../store/current_user/actions';
import { Title } from './SignInForm';

const StyledFormUploadAvatar = styled.form`
  max-width: 450px;
  margin: 0 auto;
  border: 1px dotted #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  max-width: 120px;
  margin: 0 auto; 
  background: transparent;
  border: 2px solid #333;
  padding: 7px 15px;
  border-radius: 4px;
  font-family: 'Roboto';
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.1s ease-in;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;
const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  
`;

const FileLabel = styled.label`
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: #333;
  display: inline-block;
  transition: 0.08s ease-in;
  padding: 10px;
  font-family: 'Roboto';
  font-weight: 300;
  margin-bottom: 25px;
  text-align: center;

  &:hover {
    background-color: rgba(150, 68, 197, 1);
    
  }
`;

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
    const { file } = this.state;
    const labelText = file ? file.name : 'Выберите файл';
    return (
      <Fragment>
        <Title>
          Добавить аватар пользователя
        </Title>
        <StyledFormUploadAvatar onSubmit={this.onFormSubmit}>
          <FileInput type="file" id='file' name="myImage" onChange= {this.onChange} />
          <FileLabel htmlFor="file" file={file}> {labelText} </FileLabel>
          <Button type="submit">Upload</Button>
        </StyledFormUploadAvatar>
      </Fragment>
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
