<script>
import TheNavigation from '@/components/TheNavigation.vue'
export default {
  components: {TheNavigation}
}
</script>

<template>
  <TheNavigation/>
  <div class="container mx-auto">
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
