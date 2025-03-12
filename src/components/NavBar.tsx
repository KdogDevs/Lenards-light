import React from 'react';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><a href="/shelters">Shelters</a></li>
        <li><a href="/ids">Get IDs</a></li>
        <li><a href="/bank-accounts">Bank Accounts</a></li>
        <li><a href="/jobs">Job Search</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
