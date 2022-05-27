<template>
  <div class="login">
    <div class="form">
      <div class="success" v-if="data.message">
        <span class="success__message">{{data.message}}</span>
      </div>
      <ul class="errors" v-if="data.errors">
        <li class="error" v-for="(error, key) in data.errors" :key="key">{{error}}</li>
      </ul>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <input
          type="password"
          name="password"
          placeholder="Password"
          class="input"
          v-model="data.password"
          required
          />
        </div>
        <div class="field">
          <input
          type="password"
          name="confirmation_password"
          placeholder="Password confirmation"
          class="input"
          v-model="data.password_confirmation"
          required
          />
        </div>
        <div class="action">
          <button
            type="submit"
            class="btn__link btn__primary"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { put } from '@/api';
import userAuthStore from '@/store/auth';
export default {
  name: 'ResetPasswordComponent',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { query } = route;
    const store = userAuthStore();
    const header = {
      accessToken: query['access-token'],
      client: query.client,
      expiry: query.expiry,
      uid: query.uid,
    };
    const data = reactive({
      password: '',
      password_confirmation: '',
      message: '',
      errors: [],
    });
    store.updateHeader(header);
    return {
      data,
      onSubmit: async () => {
        data.message = '';
        data.errors = [];
        try {
          const { data: { message } } = await put('/auth/password',
          { body: {
            password: data.password,
            password_confirmation: data.password_confirmation,
            redirect_url: 'http://localhost:8080/auth/',
          } })
          data.message = message;
          setTimeout(() => {
            router.push('/auth');
          }, 3000);
        } catch(e) {
          const { response: { data: { errors }, headers } } = e
          if (e.code === 'ERR_BAD_REQUEST') {
            data.errors = errors.full_messages;
          }
          store.updateHeader({
            accessToken: headers['access-token'],
            client: headers.client,
            uid: headers.uid,
            expiry: headers.expiry,
            tokenType: headers['token-type'],
          });
        } finally {
          data.password = '';
          data.password_confirmation = '';
        }
      }
    }
  }
}
</script>

<style scoped>
  @import './style.css';
</style>