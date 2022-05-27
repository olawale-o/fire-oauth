<template>
  <div class="login">
    <div class="form">
      <ul class="errors" v-if="data.errors">
        <li class="error" v-for="(error, key) in data.errors" :key="key">{{error}}</li>
      </ul>
      <button type="button" @click="continueWithGoogle" class="google__button">
        <span class="google">
          <img :src="google" alt="google" />
        </span>
        <span class="btn__text">Continue with Google</span>
      </button>
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
        <div class="field">
          <input
          type="password"
          name="password"
          placeholder="******"
          class="input"
          v-model="data.password"
          required
          />
        </div>
        <div class="field">
          <router-link to="/auth/forgot_password" class="link">Forgot password?</router-link>
        </div>
        <div class="action">
          <button
            type="submit"
            class="btn__link btn__primary"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import google from '@/assets/google.png';
import { signInWithGoogle } from '@/services/firebase';
import { post } from '@/api';
import userAuthStore from '@/store/auth';
export default {
  name: 'LoginComponent',
  setup() {
    const router = useRouter();
    const store = userAuthStore();
    const data = reactive({
      user: null,
      email: '',
      password: '',
      errors: [],
    });

    const continueWithGoogle = async () => {
      try {
        const currentUser = await signInWithGoogle();
        data.user = currentUser;
        if (data.user) {
          const { providerId: provider, accessToken, uid, email } = data.user
          const data = {
            provider,
            accessToken,
            uid,
            info: {
              email
            }
          };
          const response = await post('/social_auth/callback', {
            body: {
              user: data,
            }
          });
          if (response) {
            router.push('/private');
          }
        }
      } catch(e) {
        console.log(e);
      }
    };

    return {
      continueWithGoogle,
      google,
      data,
      onSubmit: async () => {
        data.errors = [];
        try {
          const { data: { data: user } } = await post('/auth/sign_in', {
            body: {
              email: data.email,
              password: data.password,
            }
          });
          if (user) {
            store.updateUser(user);
            router.push('/private');
          }
        } catch(e) {
          const { response: { data: { errors } } } = e
          if (e.code === 'ERR_BAD_REQUEST') {
            data.errors = errors;
          }
        } finally {
          data.email = '';
          data.password = '';
        }
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import './style.css';
</style>
