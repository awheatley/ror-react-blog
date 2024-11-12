import React from "react";
import { Link } from "react-router-dom";

// Post list link (root path) | Create new post link

function NavBar() {
  return (
    <nav>
      <Link to='/'>Posts</Link>
      {' | '}
      <Link to='/new'>New post</Link>
    </nav>
  );
}

export default NavBar;