<template>
  <div class="login">
    <div class="form">
      <span class="error"></span>
      <button type="button" @click="continueWithGoogle" class="google__button">
        <span class="google">
          <img :src="google" alt="google" />
        </span>
        <span class="btn__text">Continue with Google</span>
      </button>
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
        <div class="field">
          <input
          type="password"
          name="password"
          placeholder="******"
          class="input"
          v-model="password"
          required
          />
        </div>
        <div class="field">
          <router-link to="#" class="link">Forgot password?</router-link>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import google from '@/assets/google.png';
import { signInWithGoogle } from '@/services/firebase';
import { post } from '@/api';
export default {
  name: 'LoginComponent',
  setup() {
    const router = useRouter();
    const user = ref(null);

    const continueWithGoogle = async () => {
      try {
        const currentUser = await signInWithGoogle();
        user.value = currentUser;
        if (user.value) {
          const { providerId: provider, accessToken, uid, email } = user.value
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
      email: '',
      password: '',
      user,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import './style.css';
</style>
