import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Container } from '../components/Header';
import { Title, Form, FormCol, Input, SubmitBtn } from '../forms/SignInForm';
import FormErrors from '../forms/FormErrors';
import { addBookAxios } from '../store/book_store/actions';

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  font-size: 16px;
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 5px 10px;
`;

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  border: 1px solid #333333;
  border-radius: 4px;
  padding: 5px 10px;
`;

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author: '',
      description: '',
      price: 0,
      rating: 0,
      category_id: 0,
      img: '',
      demo_fragment: '',
      user_id: this.props.current_user.id,

      formValid: false,
      formErrors: {
        title: {
          isValid: false,
          message: ''
        },
        author: {
          isValid: false,
          message: ''
        },
        description: {
          isValid: false,
          message: ''
        },
        price: {
          isValid: false,
          message: ''
        },
        demo_fragment: {
          isValid: false,
          message: ''
        },
        category_id: {
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

  handleChange = async event => {
    const name = event.target.name;
    const value = event.target.value;

    await this.setState({
      [name]: value
    }, () => {
      this.validateField(name, value);
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { title,
      author,
      description,
      price,
      img,
      demo_fragment,
      user_id,
      category_id } = this.state;

    const res = await this.props.addBookAxios({ title,
      author,
      description,
      price,
      img,
      demo_fragment,
      user_id,
      category_id: +category_id
    });
    if (res.success) {
      this.setState({
        title: '',
        author: '',
        description: '',
        price: 0,
        rating: 0,
        img: '',
        demo_fragment: '',
        user_id: this.props.current_user.id,
        category_id: 0,
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
            message: res.message
          }
        }
      });
    }
  }

  validateField(fieldName, value) {
    const formErrors = { ...this.state.formErrors };
    const { title,
      author,
      description,
      price,
      demo_fragment,
      category_id } = formErrors;

    switch (fieldName) {
      case 'title':
        title.isValid = value.length >= 6;
        title.message = title.isValid ? '' : ' Слишком короткое название. Название должно состоять не менее чем из 6ти символов';
        break;
      case 'author':
        author.isValid = value.length > 0;
        author.message = author.isValid ? '' : 'Поле "Автор" обязательно для заполнения';
        break;
      case 'description':
        description.isValid = value.length >= 10;
        description.message = description.isValid ? '' : 'Слишком короткое описание. Описание должно состоять не менее чем из 10ти символов';
        break;
      case 'price':
        price.isValid = +value !== 0 && !isNaN(value);
        price.message = price.isValid ? '' : ' Некорректная цена';
        break;
      case 'demo_fragment':
        demo_fragment.isValid = value.length >= 0;
        demo_fragment.message = demo_fragment.isValid ? '' : '';
        break;
      case 'category_id':
        category_id.isValid = +value > 0;
        category_id.message = category_id.isValid ? '' : 'Выберите категорию!';
        break;

      default:
        break;
    }
    this.setState({
      formErrors: {
        title,
        author,
        description,
        price,
        demo_fragment,
        category_id
      }
    }, this.validateForm);
  }

  validateForm() {
    const { title,
      author,
      description,
      price,
      category_id } = this.state.formErrors;

    this.setState({
      formValid: title.isValid
                 && author.isValid
                 && description.isValid
                 && price.isValid
                 && category_id.isValid
    });
  }

  render() {
    const {
      formErrors,
      title,
      author,
      description,
      price,
      demo_fragment,
      category_id,
      formValid
    } = this.state;

    const { categories } = this.props;

    return (
      <Container>
        <Title>Add Book</Title>
        <hr/>
        <Form onSubmit={this.handleSubmit}>
          <FormErrors formErrors={formErrors} />
          <FormCol>
            <label>Title </label>
            <Input
              name='title'
              placeholder='Title'
              value={title}
              onChange={this.handleChange}
            />
          </FormCol>
          <FormCol>
            <label>Author </label>
            <Input
              name='author'
              placeholder='Author'
              value={author}
              onChange={this.handleChange}
            />
          </FormCol>
          <FormCol>
            <label>Description </label>
            <Textarea
              name='description'
              placeholder='Description'
              value={description}
              onChange={this.handleChange}
            />
          </FormCol>
          <FormCol>
            <label>Category </label>
            <Select
              placeholder='Select category'
              name='category_id'
              value={+category_id}
              onChange={this.handleChange}
            >
              <option value={0} disabled>Select a category</option>
              {categories.map(category => <option
                key={category.id}
                value={category.id}> {
                  category.title}
                </option>)}
            </Select>
          </FormCol>
          <FormCol>
            <label>Price </label>
            <Input
              name='price'
              placeholder='Price'
              type='number'
              value={price}
              onChange={this.handleChange}
            />
          </FormCol>
          <FormCol>
            <label>Demo Fragment </label>
            <Textarea
              name='demo_fragment'
              placeholder='Demo Fragment'
              value={demo_fragment}
              onChange={this.handleChange}
            />
          </FormCol>


          <SubmitBtn type='submit' disabled={!formValid} value="Добавить книгу"/>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.user,
  categories: state.categories_store.categories
});

const mapDispatchToProps = dispatch => ({
  addBookAxios: book => dispatch(addBookAxios(book)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);

AddBook.propTypes = {
  addBookAxios: PropTypes.func,
  current_user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string
  }),
  categories: PropTypes.func,
};
