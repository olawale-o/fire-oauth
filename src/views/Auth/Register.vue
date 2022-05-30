<template>
  <div class="auth">
    <RegisterComponent />
  </div>
</template>

<script>
import RegisterComponent from '@/components/Auth/Register.vue'
export default {
  name: 'RegisterView',
  components: {
    RegisterComponent,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
