import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BaseComponent from 'libs/components/BaseComponent';

import NavigationBar from '../components/NavigationBar/NavigationBar';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  if (state.$$postsStore) {
    return {
      postsCount: state.$$postsStore.get('$$posts').size,
      pathname: state.railsContext.pathname,
    };
  }
  return { };
}

class NavigationBarContainer extends BaseComponent {
  static propTypes = {
    postsCount: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  render() {
    const { postsCount, pathname } = this.props;

    return (
      <NavigationBar {...{ postsCount, pathname }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(stateToProps)(NavigationBarContainer);
