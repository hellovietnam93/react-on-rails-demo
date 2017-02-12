import React, { PropTypes } from 'react';

const Post = ({ name, updateName }) => (
  <div>
    <h3>
      {name}!
    </h3>
    <hr />
    <form >
      <label htmlFor="name">
        Say something:
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => updateName(e.target.value)}
      />
    </form>
  </div>
);

Post.propTypes = {
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
};

export default Post;
