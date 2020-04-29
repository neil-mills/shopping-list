import React, {Fragment} from 'react'
import { withCurrentUser } from '../providers';

const Profile = ({ loading, error, data }) => {
  if (loading) return (<p>Loading</p>);
  if (error) return (<p>Error: {error.message}</p>);

  return (
    <Fragment>
    <h1>Profile</h1>
    {`${data.currentUser.firstName} ${data.currentUser.lastName}`}
    </Fragment>
  )
}

export default withCurrentUser(Profile);