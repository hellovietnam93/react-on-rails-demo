import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import NonRouterPostsContainer from '../containers/NonRouterPostsContainer';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('postsStore');

  return (
    <Provider store={store}>
      <NonRouterPostsContainer />
    </Provider>
  );
};
