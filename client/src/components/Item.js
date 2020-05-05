import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_CATEGORIES, GET_BRANDS, GET_UNITS } from '../providers/queries';

const Item = ({ item = {}, handleChange, valid=false, index=1 }) => {
  const [editing, toggleEditing] = useState(false);
  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: { categories = [] } = {},
  } = useQuery(GET_CATEGORIES);
  const {
    loading: brandsLoading,
    error: brandsError,
    data: { brands = [] } = {},
  } = useQuery(GET_BRANDS);
  const {
    loading: unitsLoading,
    error: unitsError,
    data: { units = [] } = {},
  } = useQuery(GET_UNITS);

  return (
    <li className="item">
      {editing || !item.name ? (
        <span>
          <input
            type="text"
            name="name[]"
            id={`name_${index}`}
            onChange={handleChange}
            value={item.name || ''}
            placeholder="Item"
          />
        </span>
      ) : (
        <span>{item.name}</span>
      )}

      {editing || !item.categoryId ? (
        <span>
          {categoriesLoading && <p>Loading categories</p>}
          {categoriesError && <p>Category Error: {categoriesError.message}</p>}
          <select
            name="categoryId[]"
            id={`categoryId_${index}`}
            onChange={handleChange}
            value={
              item.categoryId && item.categoryId._id ? item.categoryId._id : ''
            }
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
      ) : (
        <span>
          {item.categoryId && item.categoryId.name ? item.categoryId.name : ''}
        </span>
      )}
      {editing || !item.brandId ? (
        <span>
          <select
            name="brandId[]"
            id={`brandId_${index}`}
            onChange={handleChange}
            value={item.brandId && item.brandId._id ? item.brandId._id : ''}
          >
            <option value="">Brand</option>
            {!brandsLoading &&
              !brandsError &&
              brands.map((brand) => {
                return (
                  <option key={brand._id} value={brand._id}>
                    {brand.name || ''}
                  </option>
                );
              })}
            }
          </select>
          <button>+ Brand</button>
        </span>
      ) : (
        <span>
          {item.brandId && item.brandId.name ? item.brandId.name : ''}
        </span>
        )}
      <span>
      {editing || !item.size ? (
        <input
          type="text"
          name="size[]"
          id={`size_${index}`}
          onChange={handleChange}
          value={item.size || ''}
          placeholder="Size"
        />
      ): (
          item.size
      )}
      </span>
      {editing || !item.unitId ? (
        <span>
          <select
            name="unitId[]"
            id={`unitId_${index}`}
            onChange={handleChange}
            value={item.unitId && item.unitId._id ? item.unitId : ''}
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
      ) : (
        <span>{item.unitId && item.unitId.name ? item.unitId.name : ''}</span>
        )}
      <span>
        {index !== 1 && <button>Remove Item</button>}
        <button disabled={!valid}>Tick</button>
      </span>
    </li>
  );
};

export default Item;
