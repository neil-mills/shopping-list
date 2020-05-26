const yup = require('yup');

const validator = yup.object().shape({
  name: yup.string().required('Enter a name').max(200),
});

const list = yup.object().shape({
  retailerId: yup.string().required('Select a retailer'),
  date: yup.date()
});

const item = yup.object().shape({
  name: yup.string().required('Enter a name').max(200),
  categoryId: yup.string().required('Select a category'),
  brandId: yup.string().required('Select a brand'),
  size: yup.string().required('Enter a size'),
  unitId: yup.string().required('Select a unit'),
  price: yup.string().required('Enter a price'),
});

const brand = yup.object().shape({
  name: yup.string().required('Enter a name').max(200),
  retailerId: yup.string().required('Select a retailer')
});

const formatError = (err) => {
  console.log(err.inner);
  const errors = err.inner
    .map(({ value, path, message }) => ({ path, message }));
  console.log('errors=',errors);
  return errors;
};

module.exports = { validator, list, item, brand, formatError };
