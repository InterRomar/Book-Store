import React from 'react';
import styled from 'styled-components';
import FilterCategory from './FilterCategory';
import FilterPrice from './FilterPrice';


const StyledSidebar = styled.section`
  width: 20%;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 15px 15px 15px 25px;
`;

const FilterBox = styled.div`
  margin-bottom: 40px;
`;

const Sidebar = (props) => {
  const { resetFilters } = props;
  return (
    <StyledSidebar>
      <FilterBox>
        <FilterCategory { ...props } />
      </FilterBox>
      <FilterBox>
        <FilterPrice { ...props } />
      </FilterBox>
    <button onClick={resetFilters}>
      Reset filters
    </button>
    </StyledSidebar>

  );
};

export default Sidebar;
