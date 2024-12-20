<template>
  <nav class="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-800 to-blue-950 text-white py-4 shadow-md z-50">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">BisaKita</h1>
      <ul class="flex space-x-6">
        <li>
          <router-link to="/admin" class="hover:text-blue-200 transition duration-300 ease-in-out">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/admin/create" class="hover:text-blue-200 transition duration-300 ease-in-out">Create Crowdfund</router-link>
        </li>
        <li v-if="loggedIn" class="flex items-center space-x-2">
          <span class="font-bold">Welcome, {{ username }}</span>
          <button @click="logout" class="hover:text-blue-200 transition duration-300 ease-in-out">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdminNav',
  data() {
    return {
      username: '',
      loggedIn: false,
    };
  },
  mounted() {
    const storedUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    if (storedUsername && token) {
      this.username = storedUsername;
      this.loggedIn = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      this.loggedIn = false;
      this.username = '';
      this.$router.push('/login');
    },
  },
});
</script>

<style scoped>
@media (max-width: 640px) {
  nav .container {
    flex-direction: column;
    align-items: center;
  }
  
  nav ul {
    margin-top: 1rem;
  }
}
body {
  padding-top: 4rem;
}
</style>