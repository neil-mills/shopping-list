import React, { Fragment } from 'react';
import { withCurrentUser } from '../providers';
import EditListForm from './EditListForm';
import Lists from './Lists';
const Profile = ({ loading, error, data }) => {
  return (
    <Fragment>
      <h1>Profile</h1>
      {error && <p>{`Error: ${error}`}</p>}
      {loading && <p>Loading</p>}
      <div>
        <h3>Active Lists</h3>
        <Lists />
      </div>
      <div>
        <h3>Previous Lists</h3>
        <Lists />
      </div>
      {!loading && !error && data && <EditListForm user={data.currentUser} />}
    </Fragment>
  );
};

export default withCurrentUser(Profile);
