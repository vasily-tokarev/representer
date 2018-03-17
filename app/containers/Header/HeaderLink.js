import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 1.5em;
  color: #565656;

  &:active {
    color: black;
  }
`;
