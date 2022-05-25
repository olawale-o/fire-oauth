<template>
  <div>
    <div>HomeComponent works</div>
  </div>
</template>

<script>
import { get } from '@/api';
export default {
  name: 'HomeComponent',
  setup() {
    (async() => {
      await get('/private');
    })();
    return {};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
