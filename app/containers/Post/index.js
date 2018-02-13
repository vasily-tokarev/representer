/**
 *
 * Post
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadPost } from './actions';
import makeSelectPost from './selectors';
import reducer from './reducer';
import saga from './saga';
import toNodeList from './toNodeList';

const html = (el) => el.type === 'text' ? el.match : el.jsx(el.match);

export class Post extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.onLoad(this.props.match.params.name);
  }

  render() {
    const text = this.props.post.data ? this.props.post.data.text : '';
    const name = this.props.post.data ? this.props.post.data.name : '';
    const converted = text.length > 0 ? toNodeList(text)([]) : false;
    return (
      <div>
        <Helmet>
          <title>Post {name}</title>
          <meta name="description" content="Description of Post"/>
        </Helmet>
        {this.props.post.data ? this.props.post.data.title : ''}
        <div>{converted ? converted.map(html) : ''}</div>
      </div>
    );
  }
}

Post.propTypes = {
  match: PropTypes.object,
  onLoad: PropTypes.func,
  post: PropTypes.object,
  name: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  post: makeSelectPost(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoad: (name) => {
      dispatch(loadPost(name));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'post', reducer });
const withSaga = injectSaga({ key: 'post', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Post);
