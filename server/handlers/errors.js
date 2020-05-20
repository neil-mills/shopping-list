const yup = require('yup');
const stringNotLongEnough = (path) => `${path} is incomplete`;

//schema
const validator = yup.object().shape({
  name: yup.string().required(stringNotLongEnough('Name')).max(200),
  retailerId: yup.string().required('Select a retailer'),
  brandId: yup.string().required('Select a brand'),
  categoryId: yup.string().required('Select a category'),
  unitId: yup.string().required('Select a unit'),
  price: yup.string().required('Enter a price'),
  size: yup.string().required('Enter a size'),  
});

const list = yup.object().shape({
  retailerId: yup.string().required('Select a retailer'),
  date: yup.date()
})

const formatError = (err) => {
//  console.log('Err=', err);
  const errors = err.inner
    .filter((e) => e.value !== undefined)
    .map(({ value, path, message }) => ({ path, message }));
  console.log('errors=',errors);
  return errors;
};

module.exports = { validator, list, formatError };
