import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FilterTitle } from './FilterCategory';

const PriceForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const PriceInput = styled.input`
  display: block;
  width: 30%;
`;

class FilterPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromPrice: this.props.params.from || '',
      toPrice: this.props.params.to || ''
    };
  }

  handleFocus = (event) => {
    event.target.value = '';
  }

  handleChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;

    await this.setState({
      [name]: value
    });

    const { history, fromPrice, toPrice } = this.state;
    const { params, createURL } = this.props;

    if (fromPrice !== '' && toPrice !== '') {
      const currentSearch = createURL({
        ...params,
        page: 1,
        from: fromPrice,
        to: toPrice
      }).slice(1);

      history.push({
        search: currentSearch
      });
    }
  }

  render() {
    const { fromPrice, toPrice } = this.state;

    return (
      <div>
        <FilterTitle> Цена </FilterTitle>
        <PriceForm>
          <label htmlFor="fromPrice">От:</label>
          <PriceInput
            placeholder='от'
            type="number"
            name='fromPrice'
            value={fromPrice}
            onChange={this.handleChange}
            onFocus={this.handleFocus}

          />
          <label htmlFor="toPrice">До:</label>
          <PriceInput
            placeholder='до'
            type="number"
            name='toPrice'
            value={toPrice}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
        </PriceForm>

      </div>
    );
  }
}

export default FilterPrice;


FilterPrice.propTypes = {
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
