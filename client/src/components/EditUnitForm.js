import React, { Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GET_UNITS, CREATE_UNIT, UPDATE_UNIT } from '../providers/queries';
import { useForm } from '../hooks';
import { withNotifications } from './withNotifications';

const EditUnitForm = ({ unit = {}, notifications }) => {
  const formValues = {
    _id: unit.id || '',
    name: unit.name || '',
  };
  const key = unit._id ? 'updateUnit' : 'createUnit';
  const mutation = unit.id ? UPDATE_UNIT : CREATE_UNIT;
  const [fn, { called, loading, error, data }] = useMutation(mutation);
  const editUnit = (unit) =>
    fn({
      variables: { unit: { ...unit } },
      refetchQueries: [
        {
          query: GET_UNITS,
        },
      ],
    });
  const { values, handleChange, handleSubmit } = useForm(editUnit, formValues);

  return (
    <Fragment>
      <h3>Unit</h3>
      {notifications({ called, loading, error, data, key})}
      <form method="POST" onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={values.name}
              placeholder="Name"
            />
            <input type="hidden" name="_id" value={values._id} />
          </li>
          <li>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
    </Fragment>
  );
};

export default withNotifications(EditUnitForm);
