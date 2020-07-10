import React from 'react';
import styled from 'styled-components';
import FilterCategory from './FilterCategory';


const StyledSidebar = styled.section`
  width: 20%;
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 15px 15px 15px 25px;

  
`;

const Sidebar = (props) => {
  return (
    <StyledSidebar>
      <FilterCategory { ...props }/>
    </StyledSidebar>
  );
};

export default Sidebar;
