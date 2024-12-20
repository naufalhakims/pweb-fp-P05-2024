<template>
  <nav class="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-800 to-blue-950 text-white py-4 shadow-md z-50">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">BisaKita</h1>
      <ul class="flex space-x-6">
        <li>
          <a href="#" @click="scrollToTop" class="hover:text-blue-200 transition duration-300 ease-in-out">Home</a>
        </li>
        <li>
          <a href="#" @click="scrollToFeedback" class="hover:text-blue-200 transition duration-300 ease-in-out">Feedback</a>
        </li>
        <li>
          <router-link to="/news" class="hover:text-blue-200 transition duration-300 ease-in-out">News</router-link>
        </li>
        <li v-if="!loggedIn">
          <router-link to="/login" class="hover:text-blue-200 transition duration-300 ease-in-out font-semibold">Login</router-link>
        </li>
        <li v-else class="flex items-center space-x-2">
          <span class="font-bold">Welcome, {{ username }}</span>
          <button @click="logout" class="hover:text-blue-200 transition duration-300 ease-in-out">...logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',
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
    scrollToTop(event: Event) {
      event.preventDefault();
      this.$router.push('/').then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    scrollToFeedback(event: Event) {
      event.preventDefault();
      this.$router.push('/').then(() => {
        const feedbackSection = document.getElementById('feedback');
        if (feedbackSection) {
          feedbackSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
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