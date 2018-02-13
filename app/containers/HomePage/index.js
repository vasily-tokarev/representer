/**
 *
 * HomePage
 *
 */

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PostsList from 'components/PostsList';

import { loadPosts } from './actions';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const match = window.location.search.match(/(?:post)=([^&]*)/);
    const posts = this.props.posts.data;
    return (
      <div>
        {match ? <Redirect to={`posts/${match[1]}`}/> : ''}
        {posts && posts.length > 0 ? <PostsList posts={posts}/> : ''}
      </div>
    );
  }
}

HomePage.propTypes = {
  posts: PropTypes.object,
  onLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: () => {
      dispatch(loadPosts());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
