<template>
  <div class="min-h-screen bg-stone-100">
    <AdminNav />
    <main class="container mx-auto pt-20 px-4 pb-20">
      <h2 class="text-3xl font-bold mb-6 text-center text-blue-700 pt-6 pb-12">Admin Dashboard</h2>
      
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
            <h3 class="text-2xl font-bold mb-3 text-blue-600">{{ crowdfund.name }}</h3>
            <h4 class="text-gray-600 text-xl font-semibold">Target: {{ crowdfund.target }}</h4>
            <p class="text-gray-600 mt-2 pb-6">Status: {{ crowdfund.status }}</p>
            <router-link
            :to="{ name: 'AdminDetail', params: { _id: crowdfund._id } }"
            class="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >Detail</router-link>
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
import Footer from '@/components/Footer.vue';
import { getAdminCrowdfunds } from '../services/crowdfundService';
import AdminNav from '@/components/AdminNav.vue';

export default defineComponent({
  components: { AdminNav, Footer },
  setup() {
    const crowdfunds = ref<any[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true); 

    onMounted(async () => {
      try {
        const response = await getAdminCrowdfunds();
        console.log('Crowdfunds Response:', response.data.data); 
        crowdfunds.value = response.data.data; 
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