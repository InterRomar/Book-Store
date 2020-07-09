import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getAllBooks, setCurrentPage } from '../store/book_store/actions';

export const FilterTitle = styled.h4`
  margin: 0 0 25px;
  font-size: 18px;
  color: rgb(143, 140, 140);  
  font-family: 'Arial';
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    height: 1px;
    width: 100%;
    background: #333;
    background-color: rgba(150, 68, 197, 0.7)
  }

`;
const CategoriesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const CategoryButton = styled.button`
  margin-bottom: 10px;
  background: transparent;
  border: none;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: 0.06s;

  &:hover {
    color: rgb(150, 68, 197);
  }

  &.selected {
    color: rgb(150, 68, 197);
  }
  &:focus {
    outline: none;
  }

`;

class FilterCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCategory: this.props.currentCategory
    };
  }

  changeCategory = async (event) => {
    const { currentPage, pageSize, currentCategory, getFilteredBooks, resetCurrentPage } = this.props;
    console.log(this.props);
    const category = +event.target.value;

    this.setState({
      currentCategory: category
    });
    await resetCurrentPage();
    getFilteredBooks(1, pageSize, category);
  }

  render() {
    const { categories } = this.props;
    const { currentCategory } = this.state;
    return (
      <div>
        <FilterTitle>Категории</FilterTitle>
        <CategoriesList>
          {categories.map(category => <li
            key={category.id}
          >
            <CategoryButton
              className={currentCategory === category.id ? 'selected' : ''}
              value={category.id}
              onClick={this.changeCategory}
            >
              {category.title}
            </CategoryButton>
          </li>)}
        </CategoriesList>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories_store.categories,
  currentPage: state.book_store.currentPage,
  totalCount: state.book_store.totalCount,
  pageSize: state.book_store.pageSize,
  currentCategory: state.book_store.currentCategory,
});

const mapDispatchToProps = dispatch => ({
  getFilteredBooks: (page, size, category) => dispatch(getAllBooks(page, size, category)),
  resetCurrentPage: () => dispatch(setCurrentPage(1))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategory);

FilterCategory.propTypes = {
  // categories: PropTypes.func
};
