/**
 *
 * PostingsList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import PostingListItem from 'containers/PostingListItem';
import List from 'components/List';

function PostingsList({ postings }) {
  // console.log(postings);
  return (
    <List items={postings} component={PostingListItem} />
  );
}

PostingsList.propTypes = {
  postings: PropTypes.any,
};

export default PostingsList;
