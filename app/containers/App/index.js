/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import path from 'path';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PostContainer from 'containers/PostContainer/Loadable';
import Header from 'containers/Header';

const config = require('../../../config');

const AppWrapper = styled.div`
  max-width: 55em;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Header/>
      <Switch>
        <Route exact path={path.join('/', config.mountPoint)} component={HomePage}/>
        <Route path={path.join('/', config.mountPoint, 'posts', ':name')} component={PostContainer}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </AppWrapper>
  );
}

