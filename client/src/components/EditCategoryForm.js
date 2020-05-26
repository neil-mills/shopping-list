import React, { Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../hooks';
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORIES,
} from '../providers/queries';
import { withNotifications } from './withNotifications';

const EditCategoryForm = ({ category = {}, notifications }) => {
  const mutation = category._id ? UPDATE_CATEGORY : CREATE_CATEGORY;
  const key = category._id ? 'updateCategory' : 'createCategory';

  const [fn, { called, loading, error, data }] = useMutation(mutation);

  const fields = {
    _id: category._id || '',
    name: category.name || '',
  };

  const editCategory = (category) =>
    fn({
      variables: { category: { ...category } },
      refetchQueries: [{ query: GET_CATEGORIES }],
    });

  const { handleChange, handleSubmit, values } = useForm(editCategory, fields);

  return (
    <Fragment>
      <h3>Category</h3>
      {notifications({ called, loading, error, data, key })}
      <form method="POST" onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input type="hidden" name="_id" id="_id" value={values._id} />
          </li>
          <li>
            <button type="submit" disabled={loading}>
              Submit
            </button>
          </li>
        </ul>
      </form>
    </Fragment>
  );
};

export default withNotifications(EditCategoryForm);
