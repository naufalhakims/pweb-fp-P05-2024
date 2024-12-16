<template>
    <div>
      <Navbar />
      <header class="bg-white text-blue-700 py-10 text-center">
        <h1 class="text-3xl font-bold">Welcome to BisaKita</h1>
        <p class="text-lg mt-2">Platform untuk membantu penggalangan dana</p>
      </header>
      <main class="container mx-auto mt-10">
        <section id="feedback">
          <h2 class="text-2xl font-bold mb-4">Feedback</h2>
          <FeedbackForm />
          <div
            v-if="feedbacks.length"
            class="mt-6 bg-white p-4 rounded-lg shadow-md"
          >
            <h3 class="text-lg font-bold mb-2">User Feedbacks:</h3>
            <ul class="space-y-2">
              <li
                v-for="(feedback, index) in feedbacks"
                :key="index"
                class="p-3 bg-gray-50 border border-gray-200 rounded"
              >
                <strong>{{ feedback.is_anonymous ? 'Anonymous' : feedback.name }}</strong>: {{ feedback.message }}
              </li>
            </ul>
          </div>
        </section>
      </main>
      
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import FeedbackForm from '@/components/FeedbackForm.vue';
  import Footer from '@/components/Footer.vue';
  import { getFeedbacks } from '@/services/feedbackService';
  
  export default defineComponent({
    components: { Navbar, FeedbackForm, Footer },
    setup() {
      const feedbacks = ref<any[]>([]);
  
      onMounted(async () => {
        const response = await getFeedbacks();
        feedbacks.value = response.data;
      });
  
      return { feedbacks };
    },
  });
  </script>
  