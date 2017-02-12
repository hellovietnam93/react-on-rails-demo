import postsReducer, { $$initialState as $$postsState } from './postsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$postsStore: postsReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$postsState,
  railsContextState,
};
