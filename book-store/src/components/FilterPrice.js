import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

import { FilterTitle } from './FilterCategory';

import 'react-input-range/lib/css/index.css';

const PriceForm = styled.form`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;

const StyledInputRange = styled(InputRange)`
  & .input-range__label-container {
    color: #333;
  }
  
`;

class FilterPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        min: +this.props.params.from || 0,
        max: +this.props.params.to || 350
      }
    };
  }

  handleChange = async (value) => {
    const { history, params, createURL } = this.props;
    const { min, max } = this.state.value;

    await this.setState({
      value
    });

    const currentSearch = createURL({
      ...params,
      page: 1,
      from: min,
      to: max
    }).slice(1);

    history.push({
      search: currentSearch
    });
  }

  render() {
    return (
      <div>
        <FilterTitle> Цена </FilterTitle>
        <PriceForm>
          <StyledInputRange
            maxValue={2500}
            minValue={0}
            value={this.state.value}
            onChange={this.handleChange}
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
    to: PropTypes.string,
    from: PropTypes.string,
    rating: PropTypes.string
  }),
  createURL: PropTypes.func,
};
