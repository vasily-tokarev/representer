/**
 *
 * Post
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Post from 'components/Post';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadPost, unmountPost, WSPayload } from './actions';
import makeSelectPost from './selectors';
import reducer from './reducer';
import saga from './saga';
import toNodeList from './toNodeList';

const config = require('../../../config.json');

const html = (el) => el.type === 'text' ? el.match : el.jsx(el.match);

export class PostContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.onLoad(this.props.match.params.name);
  }

  componentDidMount() {
    if (config.env === 'dev') {
      new WebSocket('ws://localhost:8080').onmessage = (evt) => {
        this.props.onWSPayload(this.props.post.name, evt.data);
      };
    }
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    return this.props.post.data && this.props.post.data.text.length > 0
      ? (<Post
        title={this.props.post.data.title}
        name={this.props.post.data.name}
        text={toNodeList(this.props.post.data.name, this.props.post.data.text)([]).map(html)}
      />)
      : null;
  }
}

PostContainer.propTypes = {
  match: PropTypes.object,
  onUnmount: PropTypes.func,
  onLoad: PropTypes.func,
  onWSPayload: PropTypes.func,
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
    onUnmount: () => {
      dispatch(unmountPost());
    },
    onWSPayload: (postName, data) => {
      dispatch(WSPayload(data, postName));
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
)(PostContainer);
