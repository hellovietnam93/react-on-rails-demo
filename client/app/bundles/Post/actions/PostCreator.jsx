/* eslint-disable import/prefer-default-export */

import requestsManager from 'libs/requestsManager';
import * as actionTypes from '../constants/PostConstants';

export function setIsFetching() {
  return {
    type: actionTypes.SET_IS_FETCHING,
  };
}

export function setIsSaving() {
  return {
    type: actionTypes.SET_IS_SAVING,
  };
}

export function fetchPostsSuccess(data) {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts: data.posts,
  };
}

export function fetchPostsFailure(error) {
  return {
    type: actionTypes.FETCH_POSTS_FAILURE,
    error,
  };
}

export function messageReceived(post) {
  return {
    type: actionTypes.MESSAGE_RECEIVED,
    post,
  };
}

export function submitPostSuccess(post) {
  return {
    type: actionTypes.SUBMIT_POST_SUCCESS,
    post,
  };
}

export function submitPostFailure(error) {
  return {
    type: actionTypes.SUBMIT_POST_FAILURE,
    error,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch(setIsFetching());
    return (
      requestsManager
        .fetchEntities()
        .then(res => dispatch(fetchPostsSuccess(res.data)))
        .catch(error => dispatch(fetchPostsFailure(error)))
    );
  };
}

export function submitComment(post) {
  return (dispatch) => {
    dispatch(setIsSaving());
    return (
      requestsManager
        .submitEntity({ post })
        .then(res => dispatch(submitPostSuccess(res.data)))
        .catch(error => dispatch(submitPostFailure(error)))
    );
  };
}
