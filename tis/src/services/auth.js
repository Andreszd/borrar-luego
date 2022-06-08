import { baseUrl as api, headers } from './api.config';

export const auth = (body) =>
  fetch(`${api}/login`, { method: 'POST', headers, body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));

export const logout = (body) =>
  fetch(`${api}/logout`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));

