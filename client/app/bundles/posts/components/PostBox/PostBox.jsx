import BaseComponent from 'libs/components/BaseComponent';
import React, { PropTypes } from 'react';

import PostForm from './PostForm/PostForm';
import PostList, { PostPropTypes } from './PostList/PostList';
import css from './PostBox.scss';
import Immutable from 'immutable';
import ActionCable from 'actioncable';

export default class PostBox extends BaseComponent {
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      fetchPosts: React.PropTypes.function,
    }),
    data: PropTypes.shape({
      isFetching: React.PropTypes.boolean,
      isSaving: React.PropTypes.boolean,
      submitPostError: React.PropTypes.string,
      $$posts: React.PropTypes.arrayOf(PostPropTypes),
    }).isRequired,
  };

  constructor() {
    super();
    _.bindAll(this, [
      'refreshPosts',
    ]);
  }

  subscribeChannel() {
    const { messageReceived } = this.props.actions;
    const protocol = window.location.protocol === "https:" ? "wss://" : "ws://"
    const cable = ActionCable.createConsumer(protocol+window.location.hostname+":"+window.location.port+"/cable");
    cable.subscriptions.create({channel: "PostsChannel"}, {
      connected: () => {
        console.log("connected")
      },
      disconnected: () => {
        console.log("disconnected")
      },
      received: (post) => {
        messageReceived(Immutable.fromJS(post));
      }
    });
  }

  componentDidMount() {
    const { fetchPosts } = this.props.actions;
    fetchPosts();
    this.subscribeChannel();
  }

  componentWillUnmount() {
    App.cable.subscriptions.remove({ channel: "PostsChannel" });
  }

  refreshPosts() {
    const { fetchPosts } = this.props.actions;
    fetchPosts();
  }

  render() {
    const { actions, data } = this.props;
    const cssTransitionGroupClassNames = {
      enter: css.elementEnter,
      enterActive: css.elementEnterActive,
      leave: css.elementLeave,
      leaveActive: css.elementLeaveActive,
    };

    return (
      <div className="postBox container">
        <h2>
          Posts {data.get('isFetching') && 'Loading...'}
        </h2>
        <ul>
          <li>
        {data.get('isFetching') && <br/> ||
          <a href="javascript:void(0)" onClick={this.refreshPosts}>Force Refresh of All Posts</a>
        }
          </li>
          <li>
          <b>Text</b> supports Github Flavored Markdown.
          </li>
          <li>
          Posts older than 24 hours are deleted.
          </li>
          <li>
          <b>Name</b> is preserved. <b>Text</b> is reset, between submits.
          </li>
          <li>
            To see Action Cable instantly update two browsers, open two browsers and submit a post!
          </li>
        </ul>
        <PostForm
          isSaving={data.get('isSaving')}
          error={data.get('submitPostError')}
          actions={actions}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
        <PostList
          $$Posts={data.get('$$Posts')}
          error={data.get('fetchPostError')}
          cssTransitionGroupClassNames={cssTransitionGroupClassNames}
        />
      </div>
    );
  }
}
