<template>
  <div class="login">
    <div class="form">
      <div class="success" v-if="data.message">
        <span class="success__message">{{data.message}}</span>
      </div>
      <ul class="errors">
        <li class="error" v-for="(error, key) in data.errors" :key="key">{{error}}</li>
      </ul>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <input
          type="email"
          name="email"
          placeholder="Email"
          class="input"
          v-model="data.email"
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
import { post } from '@/api';
export default {
  name: 'ForgotPasswordComponent',
  setup() {
    const data = reactive({
      email: '',
      message: '',
      errors: [],
    });
    return {
      data,
      onSubmit: async () => {
        try {
          const { data: { message } } = await post('/auth/password',
          { body: {
            email: data.email,
            redirect_url: 'http://localhost:8080/auth/reset_password',
          } })
          data.message = message;
        } catch(e) {
          const { response: { data: { errors } } } = e
          if (e.code === 'ERR_BAD_REQUEST') {
            data.errors = errors
          }
        } finally {
          data.email = '';
        }
      }
    }
  }
}
</script>

<style scoped>
  @import './style.css';
</style>