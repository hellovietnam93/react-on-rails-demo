import request from 'axios';
import Immutable from 'immutable';
import _ from 'lodash';
import React from 'react';
import ReactOnRails from 'react-on-rails';

import BaseComponent from 'libs/components/BaseComponent';

import PostForm from '../PostBox/PostForm/PostForm';
import PostList from '../PostBox/PostList/PostList';
import css from './SimplePostScreen.scss';

export default class SimplePostScreen extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      $$posts: Immutable.fromJS([]),
      isSaving: false,
      fetchPostsError: null,
      submitPostError: null,
    };

    _.bindAll(this, 'fetchPosts', 'handlePostSubmit');
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    return (
      request
        .get('posts.json', { responseType: 'json' })
        .then(res => this.setState({ $$posts: Immutable.fromJS(res.data.posts) }))
        .catch(error => this.setState({ fetchPostsError: error }))
    );
  }

  handlePostSubmit(post) {
    this.setState({ isSaving: true });

    const requestConfig = {
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
    };

    return (
      request
        .post('posts.json', { post }, requestConfig)
        .then(() => {
          const { $$posts } = this.state;
          const $$post = Immutable.fromJS(post);

          this.setState({
            $$posts: $$posts.unshift($$post),
            submitPostError: null,
            isSaving: false,
          });
        })
        .catch(error => {
          this.setState({
            submitPostError: error,
            isSaving: false,
          });
        })
    );
  }

  render() {
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    return (
      <div className="postBox container">
        <h2>Posts</h2>
        <p>
          Text take Github Flavored Markdown. Posts older than 24 hours are deleted.<br />
          <b>Name</b> is preserved. <b>Text</b> is reset, between submits.
        </p>
        <PostForm
          isSaving={this.state.isSaving}
          actions={{ submitPost: this.handlePostSubmit }}
          error={this.state.submitPostError}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
        <PostList
          $$posts={this.state.$$posts}
          error={this.state.fetchPostsError}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
      </div>
    );
  }
}
