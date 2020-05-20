import React, { Fragment, memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_LIST } from '../providers/queries';
import EditCategoryForm from '../components/EditCategoryForm';
import EditBrandForm from '../components/EditBrandForm';
import EditUnitForm from '../components/EditUnitForm';
import EditListForm from '../components/EditListForm';
import { withCurrentUser } from '../providers';
import EditRetailerForm from '../components/EditRetailerForm';

const List = memo(({ match, data: { currentUser } = {} }) => {

  const { loading, error, data: { list = {} } = {} } = useQuery(GET_LIST, {
    variables: { id: match.params.id },
  });
  
  return (
    <Fragment>
      <h1>Shopping List</h1>
      {loading && <p>Loading list...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <Fragment>
          <EditListForm list={list} currentUser={currentUser} />
          <EditCategoryForm />
          <EditBrandForm retailerId={list.retailerId._id} />
          <EditUnitForm />
          <EditRetailerForm />
        </Fragment>
      )}
    </Fragment>
  );
});

export default withCurrentUser(List);
