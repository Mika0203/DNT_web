import {SearchQuery} from '../models/request.model';

const queryToString = (query: SearchQuery) => {
  return Object.entries(query)
    .filter((e) => e[1] !== '')
    .map((e) => `${e[0]}=${e[1]}`)
    .join('&');
};

const getAPIURL = () => {
  if (window.location.host.includes('localhost')) {
    return `${window.location.protocol}//${window.location.hostname}${
      process.env.REACT_APP_API_URL.match(/(:[0-9]+)/)[0]
    }`;
  } else {
    return process.env.REACT_APP_API_URL;
  }
};

export {queryToString, getAPIURL};
