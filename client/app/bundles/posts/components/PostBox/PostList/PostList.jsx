import Alert from 'react-bootstrap/lib/Alert';
import BaseComponent from 'libs/components/BaseComponent';
import Immutable from 'immutable';
import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';

import Post from './Post/Post';

export const postPropTypes = {
  $$posts: PropTypes.instanceOf(Immutable.List).isRequired,
  error: PropTypes.any,
  cssTransitionGroupClassNames: PropTypes.object.isRequired,
};

export default class PostList extends BaseComponent {
  static propTypes = postPropTypes;

  constructor(props, context) {
    super(props, context);
    this.state = {};
    _.bindAll(this, 'errorWarning');
  }

  errorWarning() {
    // If there is no error, there is nothing to add to the DOM
    if (!this.props.error) return null;
    return (
      <Alert bsStyle="danger" key="postFetchError">
        <strong>Posts could not be retrieved. </strong>
        A server error prevented loading posts. Please try again.
      </Alert>
    );
  }

  render() {
    const { $$posts, cssTransitionGroupClassNames } = this.props;
    const postNodes = $$posts.map(($$post, index) =>

      // `key` is a React-specific concept and is not mandatory for the
      // purpose of this tutorial. if you're curious, see more here:
      // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
      <Post
        key={$$post.get('id') || index}
        author={$$post.get('author')}
        text={$$post.get('text')}
      />,
    );

    // For animation with ReactCSSTransitionGroup
    //   https://facebook.github.io/react/docs/animation.html
    // The 500 must correspond to the 0.5s in:
    //   client/app/bundles/posts/components/PostBox/PostBox.scss:6
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {this.errorWarning()}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName={cssTransitionGroupClassNames}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          className="postList"
          component="div"
        >
          {postNodes}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
