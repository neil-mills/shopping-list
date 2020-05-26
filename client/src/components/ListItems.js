import React, { memo, useEffect, useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../hooks';
import Item from './Item';
import { GET_LIST, UPDATE_ITEM, CREATE_ITEM } from '../providers/queries';

const ListItems = ({
  deleteItemFromList,
  listId,
  retailerId,
  items,
  userId,
}) => {
  const initialValues = {
    _id: [],
    name: [],
    categoryId: [],
    brandId: [],
    size: [],
    unitId: [],
    price: [],
  };

  const [errors, setErrors] = useState([]);

  const { values, handleSubmit, handleChange, setValues } = useForm(
    (values) => submitList(values),
    initialValues
  );

  const [
    createFn,
    { loading: creatingItem, error: errorCreatingItem },
  ] = useMutation(CREATE_ITEM, {
    refetchQueries: [{ query: GET_LIST, variables: { id: listId } }],
    awaitRefetchQueries: true,
  });

  const [
    updateFn,
    { loading: updatingItem, error: errorUpdatingItem },
  ] = useMutation(UPDATE_ITEM, {
    refetchQueries: [{ query: GET_LIST, variables: { id: listId } }],
    awaitRefetchQueries: true,
  });

  const createItem = (item) =>
    createFn({
      variables: {
        listId,
        item: { ...item },
      },
    });

  const updateItem = (item) =>
    updateFn({
      variables: {
        listId,
        item: { ...item },
      },
    });

  const getItem = (index) => {
    const item = Object.keys(initialValues).reduce((res, key) => {
      if (values[key][index] !== undefined) {
        let value = values[key][index];
        res = { ...res, [key]: value };
      }
      return res;
    }, {});
    return item;
  };

  const addItem = e => {
    e.preventDefault();
    const newValues = Object.entries(values).reduce((res, [key, value]) => {
      return { ...res, [key]: [...value, ''] };
    }, {});
    setValues(newValues);
  };

  const getFormValues = (items = []) => {
    const formValues = items.reduce((res, item) => {
      Object.entries(item).forEach(([key, val]) => {
        if (Object.keys(values).includes(key)) {
          res = { ...res, [key]: res[key] ? [...res[key], val] : [val] };
        }
        if (key === 'prices') {
          const itemPrice = val.find((p) => p.listId === listId);
          if (itemPrice) {
            const price = itemPrice ? itemPrice.price.toFixed(2) : '';
            res = {
              ...res,
              price: res.price ? [...res.price, price] : [price],
            };
          }
        }
      });
      return res;
    }, {});
    return formValues;
  };

  useEffect(() => {
    //populate form when list loaded...
    setValues(getFormValues(items));
  }, [items]);

  const formatErrors = (index, errors) => {
    setErrors((prevState) => [
      ...prevState,
      ...errors.map(({ message, path }) => ({ index, message, path })),
    ]);
  };

  const submitList = async (values) => {
    let response;
    let i = 0;
    setErrors([]);
    for (let _id of values._id) {
      const itemObj = getItem(i);
      const item = {
        ...itemObj,
        size: parseFloat(itemObj.size),
        price: parseFloat(itemObj.price),
        userId,
      };
      try {
        if (_id) {
          response = await updateItem(item);
          console.log(response);
          if (response.data.updateItem.length) {
            formatErrors(i, response.data.updateItem);
          }
        } else {
          response = await createItem(item);
          if (response.data.createItem && response.data.createItem.length) {
            formatErrors(i, response.data.createItem);
          }
        }
      } catch (e) {
        console.log(e.message);
      }
      i++;
    }
    return;
  };

  const totalSpend = values.price
    .reduce((acc, p) => (p ? (acc += parseFloat(p)) : acc), 0)
    .toFixed(2);

  const renderItems = (values) => {
    const items = [];
    for (let i = 0; i < values.name.length; i++) {
      const item = getItem(i);
      items.push(
        <Item
          item={item}
          handleChange={handleChange}
          deleteItemFromList={deleteItemFromList}
          retailerId={retailerId}
          index={i}
          errors={errors.filter((e) => e.index === i)}
          key={i}
        />
      );
    }
    return items;
  };

  return (
    <Fragment>
      <ul>{renderItems(values)}</ul>
      <button onClick={handleSubmit}>Update items</button>
      <button onClick={e => addItem(e)}>Add item +</button>
      <p>Total spend: &pound;{totalSpend}</p>
    </Fragment>
  );
};

export default withRouter(ListItems);
