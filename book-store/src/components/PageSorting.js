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
  top: 30px;
  right: 0;
  border: ${props => (props.isHide ? 'none' : '1px solid #ccc')};
`;
const PageSortingButton = styled.button`
  background: transparent;
  border: none;
  font-family: 'Roboto';
  color: ${props => {
    return props.active ? 'rgb(150, 68, 197)' : '#333';
  }};
  font-size: 16px;
  cursor: pointer;
  position: relative;
  padding: 0 25px 0 0;
  font-weight: 500;
  transition: 0.05s ease-in;

  &:focus {
    outline: none;  
  }
  &:hover {
    color: rgb(150, 68, 197);
  }

  .arrow {
    position: absolute;
    top: 0;
    right: 0;

  }


`;
const PageSortingItem = styled.li`
  background: #fff;
  border-bottom: 1px solid #ccc;
`;
const PageSortingLink = styled(Link)`
  display: block;
  padding: 5px 10px;
  font-family: 'Roboto';
  color: #333;
  text-decoration: none;
  transition: 0.05s ease-in;

  
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export default class PageSorting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHide: true
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.toggleList, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleList, false);
  }

  toggleList = (e) => {
    if (this.node.contains(e.target)) {
      if (e.target.id === 'toggleButton') {
        this.setState({
          isHide: !this.state.isHide
        });
      }
      return;
    }

    this.setState({
      isHide: true
    });
  }

  handleClick = (event) => {
    this.setState({
      selectedSortingValue: event.target.name,
      isHide: true
    });
  }

  render() {
    const { isHide } = this.state;
    const { createURL, params } = this.props;
    const activeSortingValue = params.sorting ?
      sortingValues[params.sorting] :
      sortingValues.default;
    const arrowDirection = isHide ? 'fa fa-arrow-down' : 'fa fa-arrow-up';

    return (
      <div ref={node => this.node = node}>
        <PageSortingButton
          active={!isHide}
          id='toggleButton'
        >
          {activeSortingValue}
          <div className='arrow'>
            <i className={arrowDirection} aria-hidden="true"></i>
          </div>
        </PageSortingButton>
        <PageSortingList
          isHide={isHide}
        >
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
