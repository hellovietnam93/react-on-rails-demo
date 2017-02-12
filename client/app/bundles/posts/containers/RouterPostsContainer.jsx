import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseComponent from 'libs/components/BaseComponent';

import PostScreen from '../components/PostScreen/PostScreen';
import * as postsCreators from '../actions/postsCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$postsStore };
}

class RouterPostsContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(postsCreators, dispatch);
    const locationState = this.props.location.state;

    return (
      <PostScreen {...{ actions, data, locationState }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterPostsContainer);
