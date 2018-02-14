/**
 *
 * PostListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import { Link } from 'react-router-dom';

export class PostsListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;
    const content = (
      <Link to={`/posts/${item.name}`}>
        {item.name}
      </Link>
    );
    return (
      <div>
        <ListItem key={`posts-list-item-${item.url}`} item={content} />
      </div>
    );
  }
}

PostsListItem.propTypes = {
  item: PropTypes.object,
};

export default PostsListItem;
