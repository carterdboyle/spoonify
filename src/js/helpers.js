import { TIMEOUT_SECS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const wait = function (sec) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve('timeout');
    }, sec * 1000);
  });
};

export const AJAX = async function (
  url,
  uploadData = undefined,
  deleteData = false
) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : deleteData
      ? fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECS)]);
    if (!deleteData) {
      const data = await res.json();

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
    }
  } catch (err) {
    throw err;
  }
};
