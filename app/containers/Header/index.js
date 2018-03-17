/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import HeaderLink from './HeaderLink';
import {
  GithubIcon,
  UpworkIcon,
  HomeIcon,
  SyntaxIcon,
  QuestionIcon,
} from './icons';
// import TestIcon from './TestIcon';

const Wrapper = styled.div`
  padding: 1em;
  display: flex;
  justify-content: space-between;
`;

const GithubUpwork = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const Home = styled.div`
`;

const SyntaxQuestion = styled.div`
`;

const GithubLink = styled(HeaderLink)`
  padding-right: 1em;
`;

const SyntaxLink = styled(HeaderLink)`
   padding-right: 1em;
`;

function Header() {
  return (
    <Wrapper>
      <GithubUpwork>
        <GithubLink to="/">
          <GithubIcon/>
        </GithubLink>
        <HeaderLink to="/">
          <UpworkIcon/>
        </HeaderLink>
      </GithubUpwork>

      <Home>
        <HeaderLink to="/">
          <HomeIcon/>
        </HeaderLink>
      </Home>

      <SyntaxQuestion to="/">
        <SyntaxLink to="/">
          <SyntaxIcon/>
        </SyntaxLink>
        <HeaderLink to="/">
          <QuestionIcon/>
        </HeaderLink>
      </SyntaxQuestion>
    </Wrapper>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(Header);
