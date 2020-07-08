import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../components/Header';
import { Title, Form, FormCol, Input, SubmitBtn } from '../forms/SignInForm';
import FormErrors from '../forms/FormErrors';
import { addCategoryAxios } from '../store/categories_store/actions';

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      formValid: false,
      formErrors: {
        title: {
          isValid: false,
          message: ''
        },
        global: {
          isValid: false,
          message: ''
        }
      },
    };
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    }, () => {
      this.validateField(name, value);
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { title } = this.state;

    const res = await this.props.addCategoryAxios({ title });
    if (res.success) {
      this.setState({
        title: '',
        formValid: false,
        formErrors: {
          ...this.state.formErrors,
          global: {
            isValid: true,
            message: res.message
          }
        }
      });
    }
    if (!res.success) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          global: {
            isValid: false,
            message: res
          }
        }
      });
    }
  }

  validateField(fieldName, value) {
    const formErrors = { ...this.state.formErrors };
    const { title } = formErrors;

    switch (fieldName) {
      case 'title':
        title.isValid = value.length > 0;
        title.message = title.isValid ? '' : ' Поле обязательно для заполнения';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: {
        title,
      }
    }, this.validateForm);
  }

  validateForm() {
    const { title } = this.state.formErrors;

    this.setState({
      formValid: title.isValid
    });
  }

  render() {
    return (
      <Container>
        <Title>Add Category</Title>
        <hr/>
        <Form onSubmit={this.handleSubmit}>
          <FormErrors formErrors={this.state.formErrors} />
          <FormCol>
            <label>Title </label>
            <Input
              name='title'
              placeholder='Title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormCol>
          <SubmitBtn type='submit' disabled={!this.state.formValid} value="Добавить книгу"/>
        </Form>
      </Container>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  addCategoryAxios: book => dispatch(addCategoryAxios(book)),
});

export default connect(null, mapDispatchToProps)(AddBook);

AddBook.propTypes = {
  addCategoryAxios: PropTypes.func,
};
