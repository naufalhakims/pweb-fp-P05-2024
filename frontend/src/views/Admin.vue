<template>
  <div class="min-h-screen bg-stone-100">
    <Navbar />
    <main class="container mx-auto pt-20 px-4">
      <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h2>
      <div v-if="error" class="mb-4 p-4 bg-red-200 text-red-800 rounded">
        {{ error }}
      </div>
      <div v-if="crowdfunds.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(crowdfund, index) in crowdfunds"
          :key="index"
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <h3 class="text-xl font-semibold mb-3 text-blue-600">{{ crowdfund.title }}</h3>
          <p class="text-gray-600">{{ crowdfund.description }}</p>
          <p class="text-gray-600 mt-2">Status: {{ crowdfund.status }}</p>
        </div>
      </div>
      <div v-else class="text-center text-gray-600">
        No crowdfunds available.
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { getOpenCrowdfunds } from '../services/crowdfundService';

export default defineComponent({
  components: { Navbar, Footer },
  setup() {
    const crowdfunds = ref<any[]>([]);
    const error = ref<string | null>(null);

    onMounted(async () => {
      try {
        const response = await getOpenCrowdfunds();
        crowdfunds.value = response.data;
      } catch (err) {
        error.value = 'Failed to fetch crowdfunds. Please try again later.';
        console.error(err);
      }
    });

    return { crowdfunds, error };
  },
});
</script>