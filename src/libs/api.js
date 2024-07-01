import axios from 'axios';

// axios.defaults.transformResponse = (data) => {
//   return data;
// };

axios.interceptors.request.use(
  (config) => {
    const prefix = window.blocklet ? window.blocklet.prefix : '/';
    config.baseURL = prefix || '';
    config.timeout = 200000;

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export const fetchProfile = () => axios.get(`/api/profile`);

export const updateProfile = async (id, data) => {
  return await axios.put(`/api/profile/${id}`, data);
}

export const fetchNotes = () => axios.get(`/api/notes`);

export const fetchNote = (id) => axios.get(`/api/notes/${id}`);

export const addNote = async (data) => {
  return await axios.post(`/api/notes`, data);
}

export const updateNote = async (id, data) => {
  return await axios.put(`/api/notes/${id}`, data);
}

export const delNote = (id) => axios.delete(`/api/notes/${id}`);


export default axios;
