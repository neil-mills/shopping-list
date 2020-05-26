import React, { Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from '../hooks';
import { withNotifications } from './withNotifications';
import {
  CREATE_BRAND,
  UPDATE_BRAND,
  GET_BRANDS,
  GET_RETAILERS
} from '../providers/queries';

const EditBrandForm = ({ brand = {}, retailerId, notifications }) => {
  const mutation = brand._id ? UPDATE_BRAND : CREATE_BRAND;
  const key = brand._id ? 'updateBrand' : 'createBrand';
  const [editFn, { called, loading, error, data = {} }] = useMutation(mutation);

  const { data: { retailers = [] } = {}, loading: loadingRetailers, error: errorLoadingRetailers } = useQuery(GET_RETAILERS);

  const fields = {
    _id: brand._id || '',
    retailerId: brand.retailerId || '',
    name: brand.name || '',
  };

  const editBrand = (brand) =>
    editFn({
      variables: { brand: { ...brand } },
      refetchQueries: [{ query: GET_BRANDS, variables: { retailerId } }],
    });

  const { handleChange, handleSubmit, values } = useForm(editBrand, fields);
  
  return (
    <Fragment>
    <h3>Brand</h3>
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
          </li>
          <li>
            <label htmlFor="retailerId">Retailer:</label>
            <select 
              name="retailerId"
              id="retailerId"
              onChange={handleChange}
              value={values.retailerId}
            >
              <option value="">None</option>
              {!loadingRetailers && !errorLoadingRetailers &&
              retailers.map(retailer => (
                <option key={retailer._id} value={retailer._id}>{retailer.name}</option>
              ))              
              }
            </select>          
          </li>
        <li>
          <input type="hidden" name="_id" id="_id" value={values._id} />
          <button type="submit" disabled={loading}>Submit</button>
        </li>
      </ul>
    </form>
    </Fragment>
  );
};

export default withNotifications(EditBrandForm );
