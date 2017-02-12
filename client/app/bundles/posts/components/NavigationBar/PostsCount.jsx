import React, { PropTypes } from 'react';

const href = 'https://github.com/shakacode/react_on_rails/blob/master/README.md#multiple-react-' +
  'components-on-a-page-with-one-store';
const PostsCount = (props) => (
  <li>
    <a id="js-post-count" href={href}>
      Posts: {props.postsCount}
    </a>
  </li>
);

PostsCount.propTypes = {
  postsCount: PropTypes.number.isRequired,
};

export default PostsCount;
