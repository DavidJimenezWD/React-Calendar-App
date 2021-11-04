const baseURL = process.env.REACT_APP_API_URL;

export const fetchSinToken = (endPoint, data, method = 'GET') => {
  const url = `${baseURL}/${endPoint}`;

  if (method === 'GET') {
    return fetch(url);
  } else if (method === 'POST') {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchConToken = (endPoint, data, method = 'GET') => {
  const url = `${baseURL}/${endPoint}`;
  const token = localStorage.getItem('token');

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token,
      },
    });
  } else if (method === 'POST') {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(data),
    });
  } else if (method === 'PUT') {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(data),
    });
  } else if (method === 'DELETE') {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'x-token': token,
      },
    });
  }
};
