// Example of React + Redux
import ReactOnRails from 'react-on-rails';

import App from './App';
import RouterApp from './ServerRouterApp';
import SimplePostScreen from '../components/SimplePostScreen/SimplePostScreen';
import NavigationBarApp from './NavigationBarApp';
import routerPostsStore from '../store/routerPostsStore';
import postsStore from '../store/postsStore';

ReactOnRails.register(
  {
    App,
    RouterApp,
    NavigationBarApp,
    SimplePostScreen,
  },
);

ReactOnRails.registerStore({
  routerPostsStore,
  postsStore,
});
