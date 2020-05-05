import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useForm } from '../hooks';
import { GET_LIST } from '../providers/queries';
import Item from '../components/Item';
const List = (props) => {
  const { loading, error, data: { list = {} } = {} } = useQuery(GET_LIST, {
    variables: { id: props.match.params.id },
  });
  const { values, handleSubmit, handleChange } = useForm(values => console.log(values))
  if (Object.keys(list).length) console.log(list);
  return (
    <Fragment>
      <h1>List</h1>
      {loading && <p>Loading</p>}
      {error && <p>Error: {error.message}</p>}
      <p>{props.match.params.id}</p>
      <form onSubmit={handleSubmit}>
        <ul>
      {Object.keys(list).length > 0 &&
        list.items.map((item) => <Item key={item._id} valid={false} item={item} handleChange={handleChange} />)
      }
      <Item handleChange={handleChange} />
        </ul>
      </form>
      <button>Add item +</button>
    </Fragment>
  );
};

export default List;
