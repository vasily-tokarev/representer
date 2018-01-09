/**
 *
 * PostingListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import A from 'components/A';

export class PostingListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;
    const content = (
      <A href={item.href}>
        {item.title}
      </A>
    );
    return (
      <div>
        <ListItem key={`posting-list-item-${item.url}`} item={content} />
      </div>
    );
  }
}

PostingListItem.propTypes = {
  item: PropTypes.object,
};

export default PostingListItem;
