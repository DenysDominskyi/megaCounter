import React from 'react';
import styled from 'styled-components';
import { theme } from './theme';
import { Counter } from './Counter';

function App() {
  return (
    <StyledApp theme={theme}>
      <Counter />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  ${props => props.theme.flexCenter};
  width: 350px;
  height: 300px;
  padding: 20px;
`