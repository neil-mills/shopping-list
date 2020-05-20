import React, { Fragment } from 'react';
import { useForm } from '../hooks';
import {
  CREATE_RETAILER,
  UPDATE_RETAILER,
  GET_RETAILERS,
} from '../providers/queries';
import { useMutation } from '@apollo/react-hooks';
import { withNotifications } from './withNotifications';

const EditRetailerForm = ({ retailer = {}, notifications }) => {
  const defaultValues = {
    _id: retailer._id || '',
    name: retailer.name || '',
  };

  const mutation = retailer._id ? UPDATE_RETAILER : CREATE_RETAILER;
  const key = retailer._id ? 'updateRetailer' : 'createRetailer';
  const [editFn, { called, loading, error, data = {}}] = useMutation(mutation);
  const editRetailer = (retailer) =>
    editFn({
      variables: { retailer: { ...retailer } },
      refetchQueries: [{ query: GET_RETAILERS }],
    });

  const { values, handleChange, handleSubmit } = useForm(
    editRetailer,
    defaultValues
  );

  return (
    <Fragment>
      <h3>Retailer</h3>
      {notifications({ called, loading, error, data, key})}
      <form method="POST" onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={values.name}
              placeholder="Name"
            />
            <input type="hidden" name="_id" id="_id" value={values._id} />
          </li>
          <li>
            <button type="submit">
              {retailer._id ? 'Edit Retailer' : 'Create Retailer'}
            </button>
          </li>
        </ul>
      </form>
    </Fragment>
  );
};

export default withNotifications(EditRetailerForm);
