import axios from 'axios';

const api = axios.create({
  baseURL: 'https://unhorizoned-nonimpedimental-kylah.ngrok-free.dev',
});

const setupAxiosAuth = (getToken: () => Promise<string | null>) => {
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

export { api, setupAxiosAuth };
