import React, { Fragment } from 'react';
import { withCurrentUser } from '../providers';
import Lists from '../components/Lists';
import { useQuery } from '@apollo/react-hooks';
import { GET_LISTS } from '../providers/queries';

const Profile = ({ loading, error, data: { currentUser = {} } = {} }) => {
  const { loading: listsLoading, error: listsError, data } = useQuery(
    GET_LISTS,
    {
      skip: !currentUser,
      variables: { filters: { authorId: currentUser._id } },
    }
  );
 
  const activeLists =
    !listsLoading && !listsError
      ? data.lists.filter((list) => !list.complete)
      : [];

  const completeLists =
    !listsLoading && !listsError
      ? data.lists.filter((list) => list.complete)
      : [];
  return (
    <Fragment>
      <h1>Profile</h1>
      {error && <p>{`Error: ${error}`}</p>}
      {loading && <p>Loading</p>}
      {activeLists.length !== 0 && (
        <div>
          <h3>Active Lists</h3>
          <Lists items={activeLists} />
        </div>
      )}
      {completeLists.length !== 0 && (
        <div>
          <h3>Completed Lists</h3>
          <Lists items={completeLists} />
        </div>
      )}
    </Fragment>
  );
};

export default withCurrentUser(Profile);
