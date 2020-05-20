import React, { useEffect, memo, Fragment } from 'react';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from '../hooks';
import ListItems from './ListItems';
import { withNotifications } from './withNotifications';
import {
  CREATE_LIST,
  UPDATE_LIST,
  GET_LIST,
  GET_RETAILERS,
} from '../providers/queries';

const EditListForm = memo(({ list = {}, currentUser, notifications }) => {
  const mutation = list._id ? UPDATE_LIST : CREATE_LIST;
  const key = list._id ? 'updateList' : 'createList';
  const [editFn, { called, loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(
    mutation
  );

  const { loading, error, data } = useQuery(GET_RETAILERS);

  const initialValues = {
    _id: list._id || '',
    date: list.date || Date.now(),
    items: list.items || [],
    authorId: currentUser._id,
    retailerId: list.retailerId._id || '',
    complete: list.complete || false,
  };

  const editList = (list) => editFn({
    variables: {
      list: { ...list, items: [...list.items.map((item) => item._id)] },
    },
    refetchQueries: [
      {
        query: GET_LIST,
        variables: { id: list._id } ,
      },
    ],
  });

  const { handleChange, handleSubmit, values, setValues } = useForm(
    editList,
    initialValues
  );

  const deleteItemFromList = (e, id) => {
    e.preventDefault();
    const items = [...values.items.filter(({ _id }) => _id !== id)];
    setValues({ ...values, items });
  };

  return (
    <Fragment>
    {notifications({called, loading:mutationLoading, error: mutationError, data: mutationData, key })}
    <form method="POST" onSubmit={handleSubmit}>
      <section>
        <ul>
          <li>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              id="date"
              value={
                values.date
                  ? moment(values.date).format('YYYY-MM-DD')
                  : moment.now().format('YYYY-MM-DD')
              }
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
          {/* <h2>{list.retailerId.name} - {moment(list.date).format('DD/MM/YYYY')}</h2>
          <ListItems items={list.items} listId={list._id} retailerId={list.retailerId.id} userId={currentcurrentUser._id} /> */}
        </ul>
        <button type="submit">{list._id ? 'Update List' : 'Create List'}</button>

      </section>
      <section>
        <h3>Items</h3>
        <ListItems
          retailerId={list.retailerId._id}
          items={values.items}
          deleteItemFromList={deleteItemFromList}
          listId={list._id}
          userId={currentUser._id}
        />
      </section>
    </form>
    </Fragment>
  );
});

export default withNotifications(EditListForm);
