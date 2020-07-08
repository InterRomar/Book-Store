import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

`;

class FilterCategory extends Component {
  render() {
    const { categories } = this.props;
    return (
        <div>
          <FilterTitle>Категории</FilterTitle>
          <CategoriesList>
            {categories.map(category => <li
              key={category.id}
            >
              <CategoryButton>
                {category.title}
              </CategoryButton>
            </li>)}
          </CategoriesList>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories_store.categories
});

// const mapDispatchToProps = dispatch => ({

// });

export default connect(mapStateToProps, null)(FilterCategory);

FilterCategory.propTypes = {
  // categories: PropTypes.func
};
