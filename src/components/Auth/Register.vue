<template>
  <div class="login">
    <div class="form">
      <ul class="errors" v-if="obj.errors">
        <li class="error" v-for="(error, key) in obj.errors" :key="key">{{error}}</li>
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
            type="text"
            name="name"
            placeholder="Full name"
            class="input"
            v-model="obj.name"
            required
            data-test="name-input"
          />
        </div>
        <div class="field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            class="input"
            v-model="obj.email"
            required
            data-test="email-input"
          />
        </div>
        <div class="field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            class="input"
            v-model="obj.password"
            required
            data-test="password-input"
          />
        </div>
        <div class="field">
          <router-link to="/auth/log_in" class="link" data-test="login-link">Already have an account?</router-link>
        </div>
        <div class="action">
          <button
            type="submit"
            class="btn__link btn__primary"
            data-test="submit-button"
          >
            Create
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
import { registerService, loginWithProvider } from '@/services/auth';
import userAuthStore from '@/store/auth';
export default {
  name: 'RegisterComponent',
  setup() {
    const router = useRouter();
    const store = userAuthStore();
    const obj = reactive({
      user: null,
      name: '',
      email: '',
      password: '',
      errors: [],
    });
    const continueWithGoogle = async () => {
      try {
        const currentUser = await signInWithGoogle();
        obj.user = currentUser;
        if (obj.user) {
          const { providerId: provider, accessToken, uid, email } = obj.user
          const data = {
            provider,
            accessToken,
            uid,
            info: {
              email
            }
          };
          const response = await loginWithProvider({body: { user: data }});
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
      obj,
      onSubmit: async () => {
        obj.errors = [];
        try {
          const { data } = await registerService({body: { name: obj.name, email: obj.email, password: obj.password,}});
          if (data) {
            store.updateUser(data);
            router.push('/private');
          }
        } catch(e) {
          const { response: { data: { errors } } } = e
          if (e.code === 'ERR_BAD_REQUEST') {
            obj.errors = errors;
          }
        } finally {
          obj.email = '';
          obj.password = '';
          obj.name = '';
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