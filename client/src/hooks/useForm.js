import { useState, useEffect } from 'react';

export const useForm = (callback, data) => {
  const [values, setValues] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isArray = name.includes('[]');
  const key = isArray ? name.replace('[]', '') : name;
    const newValue = isArray
      ? Array.from(e.target.form.querySelectorAll(`[name="${name}"]`)).map(
          (elm) => elm.value
        )
      : value;
    setValues({ ...values, [key]: newValue });
  };
  const handleSubmit = (e) => {
    console.log('submit')
    e.preventDefault();
    callback(values);
  };

  return { values, handleChange, handleSubmit, setValues };
};
