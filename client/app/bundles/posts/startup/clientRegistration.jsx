import ReactOnRails from 'react-on-rails';

import App from './App';
import RouterApp from './ClientRouterApp';
import SimplePostScreen from '../components/SimplePostScreen/SimplePostScreen';
import routerPostsStore from '../store/routerPostsStore';
import postsStore from '../store/postsStore';
import NavigationBarApp from './NavigationBarApp';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  App,
  RouterApp,
  NavigationBarApp,
  SimplePostScreen,
});

ReactOnRails.registerStore({
  routerPostsStore,
  postsStore,
});
