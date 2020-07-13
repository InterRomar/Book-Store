import React from 'react';
import styled from 'styled-components';

import FilterCategory from './FilterCategory';
import FilterPrice from './FilterPrice';
import FilterRating from './FilterRating';


const StyledSidebar = styled.section`
  width: 20%;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 15px 15px 15px 25px;

  & .react-stars:focus {
    outline: none;
  }
`;

const FilterBox = styled.div`
  margin-bottom: 40px;
`;

const Sidebar = (props) => {
  return (
    <StyledSidebar>
      <FilterBox>
        <FilterCategory { ...props } />
      </FilterBox>
      <FilterBox>
        <FilterPrice { ...props } />
      </FilterBox>
      <FilterBox>
        <FilterRating { ...props } />
      </FilterBox>
    </StyledSidebar>
  );
};

export default Sidebar;
