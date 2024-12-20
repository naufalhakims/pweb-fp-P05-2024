<!-- filepath: /frontend/src/views/AdminCreate.vue -->
<template>
    <div class="min-h-screen bg-stone-100">
      <AdminNav />
      <main class="container mx-auto pt-20 px-4">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">Create New Crowdfund</h2>
        
        <form @submit.prevent="createCrowdfund" class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
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
              <option value="CLOSE">Close</option>
            </select>
          </div>
          
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition duration-300"
          >
            Create Crowdfund
          </button>
        </form>
        
        <!-- Success/Error Message -->
        <div v-if="message" :class="messageType === 'success' ? 'text-green-600' : 'text-red-600'" class="mt-4 text-center mb-5">
          {{ message }}
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Footer from '@/components/Footer.vue';
  import { createCrowdfund } from '@/services/crowdfundService';
  import { useRouter } from 'vue-router';
import AdminNav from '@/components/AdminNav.vue';
  
  export default defineComponent({
    name: 'AdminCreate',
    components: { AdminNav, Footer },
    setup() {
      const name = ref('');
      const target = ref<number | null>(null);
      const status = ref('OPEN');
      const message = ref('');
      const messageType = ref<'success' | 'error'>('success');
      const router = useRouter();
  
      const createCrowdfundHandler = async () => {
        try {
          const payload = {
            name: name.value.trim(),
            target: target.value !== null ? target.value : 0,
            status: status.value,
          };

          if (!payload.name || payload.target <= 0) {
            message.value = 'Name and a valid Target amount are required.';
            messageType.value = 'error';
            return;
          }
  
          const response = await createCrowdfund(payload);
          
          if (response.status === 201 || response.status === 200) {
            message.value = 'Crowdfund created successfully!';
            messageType.value = 'success';
            // reset
            name.value = '';
            target.value = null;
            status.value = 'OPEN';
          } else {
            throw new Error('Unexpected response status');
          }
        } catch (error) {
          message.value = 'Failed to create crowdfund. Please try again.';
          messageType.value = 'error';
          console.error('Create Crowdfund Error:', error);
        }
      };
  
      return {
        name,
        target,
        status,
        message,
        messageType,
        createCrowdfund: createCrowdfundHandler,
      };
    },
  });
  </script>
  
  <style scoped>
  </style>