import { useEffect } from 'react';

export const capitalize = string => {
  return string
    .split(' ')
    .map(item => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
};

export const createArray = length => {
  return Array.from(Array(length).keys()).map(value => value + 1);
};

export const createQueryFromObject = object => {
  const result = Object.entries(object)
    .map(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        return '';
      }

      return `${key}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join('&');

  return result;
};

export const componentDidMount = callback => {
  return useEffect(callback, []);
};

export const delay = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

export const formatNumberToString = number => {
  return number.toLocaleString('en');
};

export const getBase64 = (file, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    cb(reader.result);
  };
  reader.onerror = e => {
    console.trace(e);
  };
};

export const getQueryFromURL = url => {
  const query = url.substr(1);
  const result = {};

  query
    .split('?')[1]
    .split('&')
    .forEach(part => {
      const item = part.split('=');
      result[item[0]] = decodeURIComponent(item[1]);
    });

  return result;
};

export const pluralize = (number, word) => {
  return `${number} ${word}${number !== 1 ? 's' : ''}`;
};

export const withDelay = (request, time) => {
  return Promise.all([request, delay(time)]).then(response => {
    return response[0];
  });
};

export default {
  capitalize,
  componentDidMount,
  createArray,
  createQueryFromObject,
  delay,
  formatNumberToString,
  getBase64,
  getQueryFromURL,
  pluralize,
  withDelay,
};
