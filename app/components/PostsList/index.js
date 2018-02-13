/**
 *
 * PostsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import PostListItem from 'containers/PostsListItem';
import List from 'components/List';

function PostsList({ posts }) {
  return (
    <List items={posts} component={PostListItem} />
  );
}

PostsList.propTypes = {
  posts: PropTypes.any,
};

export default PostsList;
