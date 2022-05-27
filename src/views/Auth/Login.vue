<template>
  <div class="auth">
    <LoginComponent />
  </div>
</template>

<script>
import LoginComponent from '@/components/Auth/Login.vue'
export default {
  name: 'LoginView',
  components: {
    LoginComponent,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
