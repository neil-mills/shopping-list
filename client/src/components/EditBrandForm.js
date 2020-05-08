import React, { Fragment } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from '../hooks';
import {
  CREATE_BRAND,
  UPDATE_BRAND,
  GET_BRANDS,
  GET_RETAILERS
} from '../providers/queries';

const EditBrandForm = ({ brand = {}, retailerId }) => {
  const mutation = brand._id ? UPDATE_BRAND : CREATE_BRAND;
  const [fn, { loading, error }] = useMutation(mutation);

  const { data: { retailers = [] } = {}, loading: loadingRetailers, error: errorLoadingRetailers } = useQuery(GET_RETAILERS);

  const fields = {
    _id: brand._id || '',
    retailerId: brand.retailerId || '',
    name: brand.name || '',
  };

  const editBrand = (brand) =>
    fn({
      variables: { brand: { ...brand } },
      refetchQueries: [{ query: GET_BRANDS, variables: { retailerId } }],
    });

  const { handleChange, handleSubmit, values } = useForm(editBrand, fields);
  
  return (
    <Fragment>
    <h3>Brand</h3>
      {loading && <p>Loading</p>}
      {error && <p>{error.message}</p>}
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

export default EditBrandForm;
