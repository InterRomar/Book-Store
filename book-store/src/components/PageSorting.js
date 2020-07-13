import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const sortingValues = {
  default: 'По умолчанию',
  minRating: 'По возрастанию рейтинга',
  maxRating: 'По убыванию рейтинга',
  minPrice: 'По возрастанию цены',
  maxPrice: 'По убыванию цены',
  title: 'По названию',
  author: 'По автору',
};

const PageSortingList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
`;
const PageSortingItem = styled.li`
  background: #fff;
`;
const PageSortingLink = styled(Link)`
  display: block;
  padding: 5px 10px;
  font-family: 'Roboto';
  color: #333;
  text-decoration: none;

  
  & a {
  }
`;
export default class PageSorting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSortingValue: 'По умолчанию',
      isHide: true
    };
  }

  toggleList = () => {
    this.setState({
      isHide: !this.state.isHide
    });
  }

  handleClick = async (event) => {
    await this.setState({
      selectedSortingValue: event.target.name,
      isHide: true
    });
  }

  render() {
    const { selectedSortingValue, isHide } = this.state;
    const { createURL, params } = this.props;

    return (
      <div>
        <button
          onClick={this.toggleList}
        >
          {selectedSortingValue}
        </button>
        <PageSortingList>
          {Object.keys(sortingValues).map(sortValue => <PageSortingItem
            key={sortValue}
            hidden={isHide}
          >
            <PageSortingLink
              to={() => createURL({ ...params, sorting: sortValue !== 'default' ? sortValue : '' })}
              name={sortingValues[sortValue]}
              onClick={this.handleClick}
            >
              {sortingValues[sortValue]}
            </PageSortingLink>
          </PageSortingItem>)}
        </PageSortingList>
      </div>
    );
  }
}

PageSorting.propTypes = {
  params: PropTypes.shape({
    page: PropTypes.string,
    size: PropTypes.string,
    sorting: PropTypes.string
  }),
  createURL: PropTypes.func,

};
