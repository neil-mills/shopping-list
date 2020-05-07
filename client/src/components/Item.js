import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CATEGORIES, GET_BRANDS, GET_UNITS } from '../providers/queries';

const Item = ({ item = {}, retailerId, handleSubmit, handleChange, valid=false, index=1 }) => {
  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: { categories = [] } = {},
  } = useQuery(GET_CATEGORIES);
  const {
    loading: brandsLoading,
    error: brandsError,
    data: { brands = [] } = {},
  } = useQuery(GET_BRANDS, {variables: { retailerId }});
  const {
    loading: unitsLoading,
    error: unitsError,
    data: { units = [] } = {},
  } = useQuery(GET_UNITS);

  return (
    <li className="item">
        <span>
          <input
            type="text"
            name="name[]"
            id={`name_${index}`}
            onChange={handleChange}
            value={item.name}
            placeholder="Item"
          />
        </span>
        <span>
          {categoriesLoading && <p>Loading categories</p>}
          {categoriesError && <p>Category Error: {categoriesError.message}</p>}
          <select
            name="categoryId[]"
            id={`categoryId_${index}`}
            onChange={handleChange}
            value={item.categoryId}
          >
            <option value="">Category</option>
            {!categoriesLoading &&
              categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
          <button>+ Category</button>
        </span>
        <span>
          <select
            name="brandId[]"
            id={`brandId_${index}`}
            onChange={handleChange}
            value={item.brandId}
          >
            <option value="">Brand</option>
            {!brandsLoading &&
              !brandsError &&
              brands.map((brand) => {
                return (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                );
              })}
            }
          </select>
          <button>+ Brand</button>
        </span>
      <span>
        <input
          type="text"
          name="size[]"
          id={`size_${index}`}
          onChange={handleChange}
          value={item.size}
          placeholder="Size"
          data-number="true"
        />
      </span>
        <span>
          <select
            name="unitId[]"
            id={`unitId_${index}`}
            onChange={handleChange}
          value={item.unitId}
          >
            <option value="">Unit</option>
            {!unitsLoading && !unitsError && (
            units.map(
              ({ _id, name }) => {
                return (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                );
              }
            )
            )}
          </select>
          <button>+ Unit</button>
        </span>
      <span>
        &pound;
        <input
          type="text"
          name="price[]"
          id={`price_${index}`}
          placeholder="Price"
          onChange={handleChange}
          value={item.price}
          
          />
      </span>
      <span>
        {index !== 0 && <button>Remove Item</button>}
        <button onClick={handleSubmit} disabled={valid}>Tick</button>
      </span>
      <input type="hidden" name="_id[]" value={item._id} />
    </li>
  );
};

export default Item;
