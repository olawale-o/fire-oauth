<template>
  <HomeComponent />
</template>

<script>
import HomeComponent from '@/components/Private/Home.vue'
export default {
  name: 'AuthView',
  components: {
    HomeComponent,
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
