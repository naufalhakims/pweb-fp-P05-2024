<template>
  <div class="min-h-screen bg-stone-100">
    <Navbar />
    <main class="container mx-auto pt-20 px-4">
      <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h2>
      
      <!-- Error Message -->
      <div v-if="error" class="mb-4 p-4 bg-red-200 text-red-800 rounded">
        {{ error }}
      </div>
      
      <!-- Loading Indicator -->
      <div v-if="loading" class="text-center text-gray-600">
        Loading crowdfunds...
      </div>
      
      <!-- Crowdfunds List -->
      <div v-else>
        <div v-if="crowdfunds.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(crowdfund, index) in crowdfunds"
            :key="crowdfund._id || index"
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 class="text-xl font-semibold mb-3 text-blue-600">{{ crowdfund.title }}</h3>
            <p class="text-gray-600">{{ crowdfund.description }}</p>
            <p class="text-gray-600 mt-2">Status: {{ crowdfund.status }}</p>
          </div>
        </div>
        <div v-else class="text-center text-gray-600 pb-6">
          No crowdfunds available.
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { getAdminCrowdfunds } from '../services/crowdfundService';

export default defineComponent({
  components: { Navbar, Footer },
  setup() {
    const crowdfunds = ref<any[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true); 

    onMounted(async () => {
      try {
        const response = await getAdminCrowdfunds();
        console.log('Crowdfunds Response:', response.data); 
        crowdfunds.value = response.data; 
      } catch (err) {
        error.value = 'Failed to fetch crowdfunds. Please try again later.';
        console.error('Error fetching crowdfunds:', err);
      } finally {
        loading.value = false; 
      }
    });

    return { crowdfunds, error, loading };
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