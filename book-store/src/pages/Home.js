import React, { Component } from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QueryParser from 'query-string';

import { Container } from '../components/Header';
import Sidebar from '../components/Sidebar';
import BookList from '../components/BookList';
import { getAllBooks } from '../store/book_store/actions';


export const MainTitle = styled.h1`
  text-align: center;
  font-family: "Arial";
  margin-top: 70px;
  font-size: 60px;
`;


const MainPage = styled.section`
  display: flex;
  justify-content: space-between;
`;


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {
        page: 1,
        size: 10,
        ...QueryParser.parse(props.location.search),
      },
      url: ''
    };
  }

  componentDidMount = async () => {
    const { getBooks } = this.props;
    const { page, size, category } = this.state.params;
    console.log(category);

    await getBooks(page, size, category);
  }

  componentDidUpdate = prevProps => {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({
        params: {
          ...QueryParser.parse(this.props.location.search)
        }
      });
    }
  }

  createURL = ({ page, size, category }) => {
    const categoryURL = category ? `&category=${category}` : '';

    const url = `/?page=${page || 1}&size=${size || 10}${categoryURL}`;
    return url;
  }

  render() {
    const { params, url } = this.state;
    const { location } = this.props;

    return (
      <Container>
        <MainPage>
          <Sidebar params={params} url={url} createURL={this.createURL}/>
          <BookList params={params} url={url} createURL={this.createURL}/>
        </MainPage>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBooks: (page, size, category) => dispatch(getAllBooks(page, size, category)),
});

export default connect(null, mapDispatchToProps)(Home);
