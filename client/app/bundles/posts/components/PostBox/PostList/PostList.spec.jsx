import { React, expect, TestUtils } from 'libs/testHelper';
import { List, Map } from 'immutable';

import PostList from './PostList';
import Post from './Post/Post';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedComponentsWithType,
} = TestUtils;

const cssTransitionGroupClassNames = {
  enter: 'elementEnter',
  enterActive: 'elementEnterActive',
  leave: 'elementLeave',
  leaveActive: 'elementLeaveActive',
};

describe('PostList', () => {
  const posts = List.of(
    new Map({
      id: 1,
      author: 'Frank',
      text: 'hi',
    }),
    new Map({
      id: 2,
      author: 'Furter',
      text: 'ho',
    }),
  );

  it('renders a list of Posts in normal order', () => {
    const component = renderIntoDocument(
      <PostList
        $$posts={posts}
        cssTransitionGroupClassNames={cssTransitionGroupClassNames}
      />,
    );
    const list = scryRenderedComponentsWithType(component, Post);
    expect(list.length).to.equal(2);
    expect(list[0].props.author).to.equal('Frank');
    expect(list[1].props.author).to.equal('Furter');
  });

  it('renders an alert if errors', () => {
    const component = renderIntoDocument(
      <PostList
        $$posts={posts} error="zomg"
        cssTransitionGroupClassNames={cssTransitionGroupClassNames}
      />,
    );

    const alert = findRenderedDOMComponentWithTag(component, 'strong');
    expect(alert.textContent).to.equal('Posts could not be retrieved. ');
  });
});
