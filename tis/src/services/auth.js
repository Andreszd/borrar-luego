import { baseUrl as api, headers } from './api.config';

export const auth = (body) =>
  fetch(`${api}/login`, { method: 'POST', headers, body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));

export const logout = (body) =>
  fetch(`${api}/logout`)
    .then((res) => res.json())
    .then((data) => data);

export const sendEmail = (body) =>
  fetch(`${api}/recoverpassword`, { method: 'PUT', headers, body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((data) => data);

export const sendCode = (body) =>
  fetch(`${api}/compararCodigo`, { method: 'POST', headers, body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((data) => data);

export const sendNewPass = (body) =>
  fetch(`${api}/nuevaContraseña`, { method: 'PUT', headers, body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((data) => data);
