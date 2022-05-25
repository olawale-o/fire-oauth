import { defineStore } from 'pinia';

const userAuthStore = defineStore({
  id: "user/auth",
  state: () => ({
    user: null,
    header: {
      accessToken: null,
      expiry: null,
      client: null,
      uid: null,
      tokenType: null,
    },
    loading: false,
    error: null,
  }),
  getters: {
    currentUser: (state) => state.user,
    currentHeader: (state) => state.header,
  },
  actions: {
    updateUser(payload) {
      this.user = { ...this.user, ...payload };
      this.error = null;
      this.loading = false;
    },
    updateHeader(payload) {
      this.header = { ...this.headers, ...payload };
      this.error = null;
      this.loading = false;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "auth",
        storage: localStorage,
      },
    ],
  },
});

export default userAuthStore;
