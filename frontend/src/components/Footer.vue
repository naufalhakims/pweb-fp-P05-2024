<template>
  <footer class="bg-blue-600 text-white text-center py-4 mt-10">
    <p>&copy; {{ new Date().getFullYear() }} BisaKita. All rights reserved.</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
