/* eslint new-cap: 0 */

import Immutable from 'immutable';

import * as actionTypes from '../constants/postsConstants';

export const $$initialState = Immutable.fromJS({
  $$posts: [],
  fetchPostError: null,
  submitPostError: null,
  isFetching: false,
  isSaving: false,
});

export default function postsReducer($$state = $$initialState, action = null) {
  const { type, post, posts, error } = action;

  switch (type) {

    case actionTypes.FETCH_POSTS_SUCCESS: {
      return $$state.merge({
        $$posts: posts,
        fetchPostError: null,
        isFetching: false,
      });
    }

    case actionTypes.FETCH_POSTS_FAILURE: {
      return $$state.merge({
        fetchPostError: error,
        isFetching: false,
      });
    }

    case actionTypes.MESSAGE_RECEIVED: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$posts'],
            $$posts => ($$posts.findIndex(com => com.get('id') === post.get('id')) === -1 ? $$posts.unshift(Immutable.fromJS(post)) : $$posts),
          )
      ));
    }

    case actionTypes.SUBMIT_POST_SUCCESS: {
      return $$state.withMutations(state => (
        state
          .updateIn(
            ['$$posts'],
            $$posts => $$posts.unshift(Immutable.fromJS(post)),
          )
          .merge({
            submitPostError: null,
            isSaving: false,
          })
      ));
    }

    case actionTypes.SUBMIT_POST_FAILURE: {
      return $$state.merge({
        submitPostError: error,
        isSaving: false,
      });
    }

    case actionTypes.SET_IS_FETCHING: {
      return $$state.merge({
        isFetching: true,
      });
    }

    case actionTypes.SET_IS_SAVING: {
      return $$state.merge({
        isSaving: true,
      });
    }

    default: {
      return $$state;
    }
  }
}
