// @flow

/**
 *
 * Header
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';

import 'react-tippy/dist/tippy.css';
import {
  Tooltip,
} from 'react-tippy';

import {
  GithubIcon,
  UpworkIcon,
  HomeIcon,
  // SyntaxIcon,
  QuestionIcon,
} from './icons';


import reducer from './reducer';
import HeaderLink from './HeaderLink';
import { toggleHelp } from './actions';
import { makeSelectHelpToggle } from './selectors';
const config = require('../../../config.json');

const FlexBox = styled.div`
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

const A = styled.a`
  padding-right: 1em;
  cursor: pointer;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 1.5em;
  color: #565656;

  &:active {
    color: black;
  }
`;

const Help = styled(A)`
  color: ${(props) => props.helpIsActive ? 'black' : '#565656'}
`;

const GithubLink = styled(A)`
  padding-right: 1em;
`;


type Props = {|
  helpIsActive: boolean,
  helpHandler: Function,
|}

export class Header extends React.PureComponent<Props> { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <FlexBox>
        <GithubUpwork>
          <GithubLink target="_blank" href="https://github.com/vasily-tokarev">
            <Tooltip
              html={(
                <span>Github <br/> profile</span>
              )}
              theme="light"
              offset="-20"
              arrow
              sticky
              open={this.props.helpIsActive}
            >
              <GithubIcon/>
            </Tooltip>
          </GithubLink>
          <A target="_blank" href="https://www.upwork.com/o/profiles/users/_~0199b903db1c803191/">
            <Tooltip
              html={(
                <span>Upwork <br/> profile</span>
              )}
              theme="light"
              offset="20"
              arrow
              sticky
              open={this.props.helpIsActive}
            >
              <UpworkIcon/>
            </Tooltip>
          </A>
        </GithubUpwork>

        <Home>
          <HeaderLink to={`/${config.mountPoint}`}>
            <Tooltip
              open={this.props.helpIsActive}
              title="Posts List"
              theme="light"
              arrow
              sticky
              distance="30"
            >
              <HomeIcon/>
            </Tooltip>
          </HeaderLink>
        </Home>

        <SyntaxQuestion to="/">
          <Tooltip
            open={this.props.helpIsActive}
            title="Help"
            theme="light"
            arrow
            sticky
            distance="20"
            offset="-20"
          >
            <Help
              helpIsActive={this.props.helpIsActive}
              onClick={() => this.props.helpHandler(this.props.helpIsActive)}
            >
              <QuestionIcon/>
            </Help>
          </Tooltip>
        </SyntaxQuestion>
      </FlexBox>
    )
      ;
  }
}

const mapStateToProps = createStructuredSelector({
  helpIsActive: makeSelectHelpToggle(),
});

export function mapDispatchToProps(dispatch: Function) {
  return {
    helpHandler: (isActive: boolean) => {
      dispatch(toggleHelp(isActive));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'header', reducer });

export default compose(
  withReducer,
  withConnect,
)(Header);
