import BaseComponent from 'libs/components/BaseComponent';
import React, { PropTypes } from 'react';

import marked from 'marked';
import css from './Post.scss';

export default class Post extends BaseComponent {
  static propTypes = {
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { author, text } = this.props;
    const rawMarkup = marked(text, { gfm: true, sanitize: true });

    /* eslint-disable react/no-danger */
    return (
      <div className={css.post}>
        <h2 className={`${css.postAuthor} js-post-author`}>
          {author}
        </h2>
        <span
          dangerouslySetInnerHTML={{ __html: rawMarkup }}
          className="js-post-text"
        />
      </div>
    );
  }
}
