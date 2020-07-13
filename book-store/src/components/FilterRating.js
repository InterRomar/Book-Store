import React, { Component } from 'react';
import ReactStars from 'react-rating-stars-component';
import PropTypes from 'prop-types';

import { FilterTitle } from './FilterCategory';

class FilterRating extends Component {
  ratingChanged = (newRating) => {
    const { history, params, createURL } = this.props;

    const currentSearch = createURL({
      ...params,
      page: 1,
      rating: newRating
    }).slice(1);

    history.push({
      search: currentSearch
    });
  };

  render() {
    return (
      <div>
        <FilterTitle> Рейтинг </FilterTitle>
        <ReactStars
          count={5}
          onChange={this.ratingChanged}
          size={42}
          activeColor="#9644c5"
        />
      </div>
    );
  }
}

export default FilterRating;


FilterRating.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      key: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }),
  params: PropTypes.shape({
    page: PropTypes.string,
    size: PropTypes.string,
    category: PropTypes.string,
    to: PropTypes.number,
    from: PropTypes.number,
    rating: PropTypes.string
  }),
  createURL: PropTypes.func,
};
