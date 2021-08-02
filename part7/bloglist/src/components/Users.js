import React from 'react';

const Users = ({ blogs }) => {

  const getStats = () => {
    let counts = blogs.reduce((acc, e) => {
      acc[e.user.name] = (acc[e.user.name] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map(e => ({ name: e, count: counts[e] }));
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th><b>user</b></th>
          <th><b>blogs created</b></th>
        </tr>
        {getStats().map((e) => (<tr key={e.name}><td>{e.name}</td><td>{e.count}</td></tr>))}
      </table>
    </div>
  );
};

export default Users;
