<template>
    <div class="min-h-screen bg-stone-100">
      <Navbar />
      <main class="container mx-auto pt-20 px-4">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- <div
            v-for="(crowdfund, index) in crowdfunds"
            :key="index"
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          > -->
            <!-- <h3 class="text-xl font-semibold mb-3 text-blue-600">{{ crowdfund.title }}</h3>
            <p class="text-gray-600">{{ crowdfund.description }}</p>
            <p class="text-gray-600 mt-2">Status: {{ crowdfund.status }}</p> -->
            <!-- Add more details as needed -->
          <!-- </div> -->
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
//   import { getOpenCrowdfunds } from '@/services/crowdfundService';
  
  export default defineComponent({
    components: { Navbar, Footer },
    // setup() {
    //   const crowdfunds = ref<any[]>([]);
  
    //   onMounted(async () => {
    //     const response = await getOpenCrowdfunds();
    //     crowdfunds.value = response.data;
    //   });
  
    //   return { crowdfunds };
    // },
  });
  </script>