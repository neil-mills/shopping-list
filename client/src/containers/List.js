import React, { useEffect, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from '../hooks';
import { GET_LIST, UPDATE_ITEM, CREATE_ITEM } from '../providers/queries';
import Item from '../components/Item';
import { withCurrentUser } from '../providers';

const List = ({ match, data: { currentUser } = {} }) => {
  const { loading, error, data: { list = {} } = {} } = useQuery(GET_LIST, {
    variables: { id: match.params.id },
  });

  const [
    createFn,
    { loading: creatingItem, error: errorCreatingItem },
  ] = useMutation(CREATE_ITEM, {
    refetchQueries: [{ query: GET_LIST, variables: { id: match.params.id } }],
    awaitRefetchQueries: true,
  });

  const [
    updateFn,
    { loading: updatingItem, error: errorUpdatingItem },
  ] = useMutation(UPDATE_ITEM, {
    refetchQueries: [{ query: GET_LIST, variables: { id: match.params.id } }],
    awaitRefetchQueries: true,
  });

  const createItem = (item) =>
    createFn({
      variables: {
        listId: list._id,
        item: { ...item },
      },
    });

  const updateItem = (item) =>
    updateFn({
      variables: {
        listId: list._id,
        item: { ...item},
      },
    });

  const initialValues = {
    _id: [],
    name: [],
    categoryId: [],
    brandId: [],
    size: [],
    unitId: [],
    price: [],
  };

  const { values, handleSubmit, handleChange, setValues } = useForm(
    (values) => submitList(values),
    initialValues
  );

  const submitList = async (values) => {
    let i = 0;
    for (let _id of values._id) {
      const itemObj = getItem(i);
      const item = {
        ...itemObj,
        size: parseFloat(itemObj.size, 2),
        price: parseFloat(itemObj.price, 2),
        userId: currentUser._id,
      };
      try {
        if (_id) {
          await updateItem(item);
        } else {
          await createItem(item);
        }
      } catch (e) {
        console.log(e.message);
      }
      i++;
    }
    return;
  };

  const addItem = () => {
    const newValues = Object.entries(values).reduce((res, [key, value]) => {
      return { ...res, [key]: [...value, ''] };
    }, {});
    setValues(newValues);
  };

  const removeItem = (index) => {
    const newValues = Object.keys(values).reduce((res, key) => {
      return { ...res, [key]: [...res[key].filter((item, i) => i !== index)] };
    }, {});
    setValues(newValues);
  };

  const getFormValues = (items = []) => {
    return items.reduce((res, item) => {
      Object.entries(item).forEach(([key, val]) => {
        if (Object.keys(values).includes(key)) {
          res = { ...res, [key]: res.key ? [...res[key], val] : [val] };
        }
        if (key === 'prices') {
          const itemPrice = val.find((p) => p.listId === list._id);
          if (itemPrice) {
            const price = itemPrice ? itemPrice.price : '';
            res = { ...res, price: res.price ? [...res.price, price] : [price]};  
          }
        }
      });
      return res;
    }, {});
  };

  useEffect(() => {
    //populate form when list loaded...
    if (!loading && !error) {
      //console.log('LIST=', list);
     // const formValues = getFormValues(list.items);
      setValues(getFormValues(list.items));
    }
  }, [list]);

  const getItem = (index) => {
    const item = Object.keys(initialValues).reduce((res, key) => {
      if (values[key][index]) {
        let value = values[key][index];
        res = { ...res, [key]: value };
      }
      return res;
    }, {});

    return item;
  };

  const renderItems = (values) => {
    const items = [];
    for (let i = 0; i < values.name.length; i++) {
      const item = getItem(i);

      items.push(
        <Item
          item={item}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          removeItem={removeItem}
          retailerId={list.retailerId._id}
          index={i}
          key={i}
        />
      );
    }
    return items;
  };

  return (
    <Fragment>
      <h1>List</h1>
      {loading && <p>Loading</p>}
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <ul>
          {!loading && list.items && <Fragment>{renderItems(values)}</Fragment>}
        </ul>
      </form>
      <button onClick={() => addItem()}>Add item +</button>
    </Fragment>
  );
};

export default withCurrentUser(List);
