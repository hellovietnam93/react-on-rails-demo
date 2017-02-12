import { React, expect, TestUtils } from 'libs/testHelper';

import Post from './Post';

const {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
} = TestUtils;

describe('Post', () => {
  it('renders an author and post with proper css classes', () => {
    const component = renderIntoDocument(
      <Post author="Frank" text="Hi!" />,
    );

    // TODO: Setup testing of CSS Modules classNames
    // const post = findRenderedDOMComponentWithTag(component, 'div');
    // expect(post.className).to.equal('post');
    // const author = findRenderedDOMComponentWithTag(component, 'h2');
    // expect(author.className).to.equal('post-author');
    const text = findRenderedDOMComponentWithTag(component, 'span');
    expect(text.className).to.equal('js-post-text');
  });

  it('shows the author', () => {
    const component = renderIntoDocument(
      <Post author="Frank" text="Hi!" />,
    );

    const author = findRenderedDOMComponentWithClass(component, 'js-post-author');
    expect(author.textContent).to.equal('Frank');
  });

  it('shows the post text in markdown', () => {
    const component = renderIntoDocument(
      <Post author="Frank" text="Hi!" />,
    );

    const post = findRenderedDOMComponentWithClass(component, 'js-post-text');
    expect(post.textContent).to.equal('Hi!\n');
  });
});
