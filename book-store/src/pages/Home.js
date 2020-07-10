import React, { Component } from 'react';
import styled from 'styled-components';
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
        page: '1',
        size: '10',
        ...QueryParser.parse(props.location.search),
      },
    };
  }

  componentDidMount = async () => {
    const { getBooks, location } = this.props;
    const url = location.search || '?page=1&size=10';

    await getBooks(url);
  }

  componentDidUpdate = async prevProps => {
    const { getBooks, location } = this.props;

    if (location.search !== prevProps.location.search) {
      await this.setState({
        params: {
          ...QueryParser.parse(location.search)
        }
      });

      await getBooks(location.search);
    }
  }

  createURL = ({ page, size, category, from, to }) => {
    const categoryURL = category ? `&category=${category}` : '';
    const priceURL = from !== undefined && to !== undefined ? `&from=${from}&to=${to}` : '';

    const url = `/?page=${page || 1}&size=${size || 10}${categoryURL}${priceURL}`;
    return url;
  }

  resetFilters = () => {
    this.props.history.push({
      search: ''
    });
  }

  render() {
    const { params } = this.state;
    const { history, location } = this.props;


    return (
      <Container>
        <MainPage>
          <Sidebar
            params={params}
            history={history}
            location={location}
            createURL={this.createURL}
            resetFilters={this.resetFilters}
          />
          <BookList
            params={params}
            createURL={this.createURL}
          />
        </MainPage>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getBooks: (url) => dispatch(getAllBooks(url)),
});

export default connect(null, mapDispatchToProps)(Home);


Home.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
  params: PropTypes.shape({
    page: PropTypes.string,
    size: PropTypes.string,
    category: PropTypes.string
  }),
  getBooks: PropTypes.func,
  totalCount: PropTypes.number
};
