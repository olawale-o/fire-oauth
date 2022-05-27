<template>
  <div class="login">
    <div class="form">
      <span class="error"></span>
      <form @submit="console.log('submit')">
        <div class="field">
          <input
          type="email"
          name="email"
          placeholder="Email"
          class="input"
          v-model="email"
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
import { ref } from 'vue';
import { post } from '@/api';
export default {
  name: 'ForgotPasswordComponent',
  setup() {
    const email = ref('');
    return {
      email,
      onSubmit: async () => {
        const response = await post('/auth/password',
          { body: {
            email,
            redirect_url: 'http://localhost:8080/reset_password',
          } })
        console.log(response);
      }
    }
  }
}
</script>

<style scoped>
  @import './style.css';
</style>