import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
      fromPrice: this.props.params.from || 0,
      toPrice: this.props.params.to || 300
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

    const { fromPrice, toPrice } = this.state;
    const { history, location, params, createURL } = this.props;

    const currentSearch = createURL({
      ...params,
      page: 1,
      from: fromPrice,
      to: toPrice
    }).slice(1);

    this.props.history.push({
      search: currentSearch
    });
  }

  render() {
    // const { params, createURL } = this.props;
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
