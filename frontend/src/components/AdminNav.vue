<template>
  <nav class="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-800 to-blue-950 text-white py-4 shadow-md z-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-between items-center">
        <h1 class="text-2xl font-bold">BisaKita</h1>
        <button @click="toggleMenu" class="sm:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <ul :class="['sm:flex space-y-2 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0 w-full sm:w-auto', { 'hidden sm:flex': !isMenuOpen }]">
          <li>
            <router-link to="/admin" class="block hover:text-blue-200 transition duration-300 ease-in-out">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/admin/create" class="block hover:text-blue-200 transition duration-300 ease-in-out">Create Crowdfund</router-link>
          </li>
          <li v-if="loggedIn" class="flex items-center space-x-2">
            <span class="font-bold">Welcome, {{ username }}</span>
            <button @click="logout" class="hover:text-blue-200 transition duration-300 ease-in-out">Logout</button>
          </li>
        </ul>
      </div>
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
      isMenuOpen: false,
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
});
</script>

<style scoped>
@media (max-width: 640px) {
  nav {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ul {
    margin-top: 0.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
}

body {
  padding-top: 4rem;
}

@media (min-width: 641px) {
  body {
    padding-top: 5rem;
  }
}
</style>

