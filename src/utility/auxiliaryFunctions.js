import axios from 'axios';

export const correctData = str => {
  const data = new Date(str).getDate();
  const month = new Date(str).getMonth() + 1;
  const year = new Date(str).getFullYear();
  return (
    (data < 10 ? '0' + data.toString() + '.' : data.toString() + '.') +
    (month < 10 ? '0' + month.toString() : month.toString()) + '.' +
    year.toString()
  );
};

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
};

export const dateToRequest = dateReq => {
  const data = new Date(dateReq).getDate();
  const month = new Date(dateReq).getMonth() + 1;
  const year = new Date(dateReq).getFullYear();
  return (
    year.toString() + '-' +
    (month < 10 ? '0' + month.toString() + '-' : month.toString() + '-') +
    (data < 10 ? '0' + data.toString() : data.toString()));
};

export const correctDataForSummary = str => {
  const data = new Date(str).getDate();
  const month = new Date(str).getMonth() + 1;
  const year = new Date(str).getFullYear();
  return (
    (data < 10 ? '0' + data.toString() + '/' : data.toString() + '/') + (month < 10 ? '0' + month.toString() : month.toString()) + '/' + year.toString()
  );
};

export const replaceForSummary = str => str.replaceAll('.', '/');

export const correctDateForAddOperation = date => date.split('.').reverse().join('-');

export const validateDailyCalories = values => {
  const errors = {};
  if (!values.height) {
    errors.height = 'Required';
  } else if (values.height > 300) {
    errors.height = 'Height must be less than 300';
  } else if (values.height < 100) {
    errors.height = 'Height must be more than 100';
  };

  if (!values.age) {
    errors.age = 'Required';
  } else if (values.age > 99) {
    errors.age = 'Invalid age. Age must be less than 100 years ';
  } else if (values.height < 15) {
    errors.age = 'Invalid age. Age must be more than 15 years ';
  };

  if (!values.weight) {
    errors.weight = 'Required';
  } else if (values.weight > 250) {
    errors.weight = 'Invalid wight. Wight must be less than 250 kilogram ';
  } else if (values.weight < 20) {
    errors.weight = 'Invalid wight. Wight must be more than 20 kilogram ';
  };

  if (!values.desiredWeight) {
    errors.desiredWeight = 'Required';
  } else if (values.desiredWeight > 100) {
    errors.desiredWeight =
      'Invalid wight. Wight must be less than 100 kilogram ';
  } else if (values.desiredWeight < 20) {
    errors.desiredWeight =
      'Invalid wight. Wight must be more than 20 kilogram ';
  }

  if (!values.bloodType) {
    errors.bloodType = 'Required';
  }
  return errors;
};

export const validateForLogin = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 10) {
    errors.password = 'Must be 10 characters or more';
  }
  return errors;
};

export const validateForRegister = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 3) {
    errors.username = 'Must be 3 characters or more';
  };
  
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  };

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 10) {
    errors.password = 'Must be 10 characters or more';
  };
  return errors;
};