<template>
  <form
    @submit.prevent="submitFeedback"
    class="bg-white p-8 rounded-lg shadow-lg space-y-6"
  >
    <div class="flex items-center mb-4">
      <div class="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
      type="checkbox"
      v-model="form.is_anonymous"
      id="is_anonymous"
      class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-colors duration-200"
    />
    <label
      for="is_anonymous"
      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200"
    ></label>
      </div>
      <label for="is_anonymous" class="text-lg font-semibold text-gray-700 ml-2">Submit secara Anonim</label>
    </div>
    <div>
      <label for="name" class="block text-xl font-semibold mb-2 text-black">Nama</label>
      <input
        type="text"
        v-model="form.name"
        id="name"
        :placeholder="form.is_anonymous ? 'Anda mensubmit secara anonim' : 'Masukkan nama Anda'"
        class="w-full border border-gray-300 p-3 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
        :disabled="form.is_anonymous"
      />
    </div>
    <div>
      <label for="email" class="block text-xl font-semibold mb-2 text-black">Email</label>
      <input
        type="email"
        v-model="form.email"
        id="email"
        :placeholder="form.is_anonymous ? 'Anda mensubmit secara anonim' : 'Masukkan email Anda'"
        class="w-full border border-gray-300 p-3 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
        :disabled="form.is_anonymous"
      />
    </div>
    <div>
      <label for="message" class="block text-xl font-semibold mb-2 text-black">Pesan Anda untuk Kami</label>
      <textarea
        v-model="form.message"
        id="message"
        placeholder="Masukkan feedback Anda"
        class="w-full border border-gray-300 p-3 rounded-md h-32 text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 resize-none"
      ></textarea>
    </div>
    <button
      type="submit"
      class="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 font-semibold text-lg"
    >
      Submit Feedback
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { sendFeedback } from '@/services/feedbackService';

export default defineComponent({
  emits: ['feedback-submitted'],
  setup(_, { emit }) {
    const form = reactive({
      name: '',
      is_anonymous: false,
      email: '',
      message: '',
    });

    const submitFeedback = async () => {
      try {
        await sendFeedback(form);
        emit('feedback-submitted');
        form.name = '';
        form.is_anonymous = false;
        form.email = '';
        form.message = '';
        alert('Thank you for your feedback!');
      } catch (error) {
        console.error('Failed to submit feedback:', error);
        alert('Failed to submit feedback. Please try again later.');
      }
    };

    return { form, submitFeedback };
  },
});
</script>

<style scoped>
.toggle-checkbox:checked {
  @apply right-0 border-blue-600;
}
.toggle-checkbox:checked + .toggle-label {
  @apply bg-blue-600;
}
.toggle-checkbox:focus + .toggle-label {
  @apply ring-2 ring-blue-600;
}
</style>