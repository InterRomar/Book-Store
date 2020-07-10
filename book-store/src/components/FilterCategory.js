import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  render() {
    const { categories, params, createURL } = this.props;
    const { size } = params;

    return (
      <div>
        <FilterTitle>Категории</FilterTitle>
        <CategoriesList>
          {categories.map(category => <li
            key={category.id}
          >
            <Link to={() => createURL({ ...params, page: 1, size, category: category.id })}>
              <CategoryButton
                className={+params.category === category.id ? 'selected' : ''}
              >
                {category.title}
              </CategoryButton>
            </Link>
          </li>)}
        </CategoriesList>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories_store.categories,
});

export default connect(mapStateToProps, null)(FilterCategory);

FilterCategory.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string
    })
  ),
  params: PropTypes.shape({
    page: PropTypes.string,
    size: PropTypes.string,
    category: PropTypes.string
  }),
  createURL: PropTypes.func,

};
