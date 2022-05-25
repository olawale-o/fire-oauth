<template>
  <div class="auth">
    <LoginComponent />
  </div>
</template>

<script>
import LoginComponent from '@/components/Auth/Login.vue'
export default {
  name: 'AuthView',
  components: {
    LoginComponent,
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import './style.css';
</style>
