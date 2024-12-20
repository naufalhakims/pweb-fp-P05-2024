<template>
    <div class="min-h-screen bg-stone-100">
      <Navbar />
      <main class="container mx-auto pt-20 px-4">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">edit New Crowdfund</h2>
        
        <form @submit.prevent="editCrowdfund" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <!-- Name Field -->
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              required
              class="w-full border border-gray-300 p-2 rounded mt-1 text-black"
              placeholder="Enter crowdfund name"
            />
          </div>
          
          <!-- Target Field -->
          <div class="mb-4">
            <label for="target" class="block text-gray-700">Target</label>
            <input
              type="number"
              id="target"
              v-model="target"
              required
              class="w-full border border-gray-300 p-2 rounded mt-1 text-black"
              placeholder="Enter target amount"
              min="0"
            />
          </div>
          
          <!-- Status Field -->
          <div class="mb-6">
            <label for="status" class="block text-gray-700">Status</label>
            <select
              id="status"
              v-model="status"
              class="w-full border border-gray-300 p-2 rounded mt-1 text-black"
            >
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition duration-300"
          >
            edit Crowdfund
          </button>
        </form>
        
        <!-- Success/Error Message -->
        <div v-if="message" :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'" class="mt-4 text-center">
          {{ message }}
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
//   import { editCrowdfund } from '@/services/crowdfundService';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'AdminEdit',
    components: { Navbar, Footer },
    setup() {
      const name = ref('');
      const target = ref<number | null>(null);
      const status = ref('OPEN');
      const message = ref('');
      const messageType = ref<'success' | 'error'>('success');
      const router = useRouter();
  
      const editCrowdfundHandler = async () => {
        try {
          const payload = {
            name: name.value.trim(),
            target: target.value !== null ? target.value : 0,
            status: status.value,
          };
  
          // Validate input fields
          if (!payload.name || payload.target <= 0) {
            message.value = 'Name and a valid Target amount are required.';
            messageType.value = 'error';
            return;
          }
  
          // Call the service to edit a new crowdfund
          const response = await editCrowdfund(payload);
          
          if (response.status === 201 || response.status === 200) {
            message.value = 'Crowdfund editd successfully!';
            messageType.value = 'success';
            
            // Optionally, redirect to the Admin Dashboard or Crowdfund Detail page
            // router.push({ name: 'AdminDashboard' });
            // OR if you want to go to the detail page:
            // router.push({ name: 'AdminDetail', params: { crowdfundid: response.data.data._id } });
  
            // Reset form fields
            name.value = '';
            target.value = null;
            status.value = 'OPEN';
          } else {
            throw new Error('Unexpected response status');
          }
        } catch (error) {
          message.value = 'Failed to edit crowdfund. Please try again.';
          messageType.value = 'error';
          console.error('edit Crowdfund Error:', error);
        }
      };
  
      return {
        name,
        target,
        status,
        message,
        messageType,
        editCrowdfund: editCrowdfundHandler,
      };
    },
  });
  </script>
  
  <style scoped>
  </style>