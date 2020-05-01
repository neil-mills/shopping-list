import { useState } from 'react';

export const useForm = (callback, data) => {
  const [values, setValues] = useState(data);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = e => {
    e.preventDefault();
    console.log(callback)
    callback(values)
  }

  return { values, handleChange, handleSubmit }
};
