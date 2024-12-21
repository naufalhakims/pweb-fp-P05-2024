<template>
    <div>
      <h1>All Crowdfunds</h1>
      <div v-for="crowdfund in crowdfunds" :key="crowdfund.id" class="card">
        <h3>{{ crowdfund.title }}</h3>
        <p>Target: {{ crowdfund.target }}</p>
        <p>Progress: {{ crowdfund.progress }}</p>
        <button @click="viewDetails(crowdfund.id)">View Details</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        crowdfunds: [],
      };
    },
    async created() {
      const response = await axios.get('/api/crowdfund');
      this.crowdfunds = response.data;
    },
    methods: {
      viewDetails(id) {
        this.$router.push(`/crowdfund/${id}`);
      },
    },
  };
  </script>
  
