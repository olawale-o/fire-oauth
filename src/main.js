import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';
import api from './api';
import userAuthStore from './store/auth';
import pinia from './store';
let app;

api.interceptors.request.use((config) => {
  const userStore = userAuthStore();
  const token = userStore.currentHeader.accessToken;
  if (token) {
    config.headers["access-token"] = token;
    config.headers["token-type"] = userStore.currentHeader.tokenType;
    config.headers["client"] = userStore.currentHeader.client;
    config.headers["uid"] = userStore.currentHeader.uid;
    config.headers["expiry"] = userStore.currentHeader.expiry;
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    const userStore = userAuthStore();
    if (response.status === 201) {
      const { headers } = response.data;
      userStore.updateHeader({
        accessToken: headers['access-token'],
        expiry: headers.expiry,
        client: headers.client,
        uid: headers.uid,
        tokenType: headers['token-type'],
      });
    }
    if (response.status === 200 && response.headers['access-token']) {
      const { headers } = response;
      userStore.updateHeader({
        accessToken: headers['access-token'],
        expiry: headers.expiry,
        client: headers.client,
        uid: headers.uid,
        tokenType: headers['token-type'],
      });
    }
    return response;
  },
  function (error) {
    throw error;
  }
);

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.use(pinia);
    app.mount('#app');
  }
});
