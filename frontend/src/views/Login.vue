<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Login Form -->
    <div class="flex justify-center items-center flex-grow">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center mb-6 text-blue-600">Login</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-lg">Email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              class="w-full border border-gray-300 p-2 rounded text-black"
              required
            />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 text-lg">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              class="w-full border border-gray-300 p-2 rounded text-black"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

export default defineComponent({
  components: { Navbar },

  setup() {
    const email = ref('');
    const password = ref('');

    const login = async () => {
      if (email.value && password.value) {
        try {
          const response = await axios.post('http://localhost:3000/user/login', {
            email: email.value,
            password: password.value,
          });
          const { token, user_ } = response.data.data;
          localStorage.setItem('token', token);
          localStorage.setItem('role', user_.role);
          localStorage.setItem('username', user_.username); // Save username
          alert('Login successful!');

          if (user_.role === 'ADMIN') {
            window.location.href = '/admin';
          } else {
            window.location.href = '/crowdfund';
          }
        } catch (error) {
          alert('Login failed. Please check your credentials.');
        }
      } else {
        alert('Please enter valid credentials!');
      }
    };

    return { email, password, login };
  },
});
</script>