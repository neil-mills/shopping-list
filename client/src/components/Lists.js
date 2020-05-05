import React from 'react';
import moment from 'moment';

const Lists = ({ items = [] }) => {
  return (
    <ul>
      {items.map(({ _id, retailerId: { name }, date, items }) => {

        return (
          <li key={_id}>
            <span>{name}, {moment(date).format('DD-MM-YYYY')}, {items.length} Items</span>
            <button>Edit</button>
          </li>
        )
      })}
    </ul>
  );
};

export default Lists;
