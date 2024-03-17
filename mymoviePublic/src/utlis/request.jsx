import axios from "axios";


const base_url = "https://api.themoviedb.org/3/";

export const request = (url, method, param) => {

  return axios({
    url: base_url + url,
    method: method,
    data: param,
    headers: {
        accept: 'application/json',
        Authorization: 'Authorization key',
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {});
};

