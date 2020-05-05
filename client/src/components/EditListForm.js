import React from 'react';
import { useForm } from '../hooks';
import { CREATE_LIST, GET_LISTS, GET_RETAILERS } from '../providers/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';

const EditListForm = ({ user }) => {
  const [
    resolver,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_LIST);
  const { loading, error, data } = useQuery(GET_RETAILERS);
  const list = {
    date: '',
    items: [],
    authorId: user._id,
    retailerId: '',
    complete: false,
  };
  const createList = (list) =>
    resolver({
      variables: { list: { ...list } },
      refetchQueries: [
        { query: GET_LISTS, variables: { filters: { authorId: user._id } } },
      ],
    });

  const { handleChange, handleSubmit, values } = useForm(createList, list);
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error: </p>;
  }
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <ul>
        <li>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            id="date"
            value={values.date || moment().format('YYYY-MM-DD')}
            onChange={handleChange}
          />
        </li>
        <li>
          <label htmlFor="retailerId">Retailer:</label>
          <select
            name="retailerId"
            id="retailerId"
            value={values.retailerId}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {data &&
              data.retailers.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
          </select>
          <a title="Add Retailer">Add Retailer</a>
        </li>
        <li>
          <button type="submit">Create List</button>
        </li>
      </ul>
    </form>
  );
};

export default EditListForm;
