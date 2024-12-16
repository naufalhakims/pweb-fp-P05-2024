<template>
  <nav class="bg-blue-600 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-lg font-bold">BisaKita</h1>
      <ul class="flex space-x-4">
        <li><router-link to="/" class="hover:underline">Home</router-link></li>
        <li><router-link to="/news" class="hover:underline">News</router-link></li>
        <li><router-link to="/login" class="hover:underline">Login</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* Scoped CSS (jika diperlukan tambahan styling khusus) */
</style>
