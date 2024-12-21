<template>
  <div>
    <Navbar />
    <div class="min-h-screen bg-white-100">
      <div class="content mx-auto max-w-6xl px-4 py-10">
        <h1 class="text-3xl font-bold text-center mb-8 text-blue-700">All Crowdfunds</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="crowdfund in crowdfunds"
            :key="crowdfund.id"
            class="card bg-white shadow-lg rounded-lg p-6"
          >
            <h3 class="text-lg font-semibold mb-2 text-gray-800">
              {{ crowdfund.name }}
            </h3>
            <p class="text-sm text-gray-600 mb-1">
              <span class="font-bold">Target:</span> {{ crowdfund.target }}
            </p>
            <p class="text-sm text-gray-600 mb-4">
              <span class="font-bold">Progress:</span> {{ crowdfund.current_donation }}
            </p>
            <button
              @click="viewDetails(crowdfund.id)"
              class="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import { getCrowdFundsUsers } from "@/services/crowdfundService";


export default {
  components: {
    Navbar,
  },
  data() {
    return {
      crowdfunds: [],
    };
  },
  async created() {
    try {
      const data = await getCrowdFundsUsers();
      console.log("API Response:", data); // Log the entire response data
      this.crowdfunds = data.data.data;
    } catch (error) {
      console.error("Error fetching crowdfunds:", error);
    }
  },
  methods: {
    viewDetails(id) {
      this.$router.push(`/crowdfund/${id}`);
    },
  },
};
</script>


<style scoped>
.content {
  padding-top: 80px; /* Adjust this value to ensure the content clears the navbar */
}
.card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
</style>