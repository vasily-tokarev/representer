/**
*
* Post
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';


function Post(props) {
  return (
    <div>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      {props.text}
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  text: PropTypes.array, // Strings and React components.
};

export default Post;
