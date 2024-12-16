<template>
  <form
    @submit.prevent="submitFeedback"
    class="bg-gray-100 p-6 rounded-lg shadow-md space-y-4"
  >
    <div>
      <label for="name" class="block text-gray-700">Name:</label>
      <input
        type="text"
        v-model="form.name"
        id="name"
        class="w-full border border-gray-300 p-2 rounded text-black"
        :disabled="form.is_anonymous"
      />
    </div>
    <div>
      <label for="is_anonymous" class="flex items-center space-x-2">
        <input
          type="checkbox"
          v-model="form.is_anonymous"
          id="is_anonymous"
          class="form-checkbox text-blue-600"
        />
        <span class="text-gray-700">Submit anonymously</span>
      </label>
    </div>
    <div>
      <label for="email" class="block text-gray-700">Email:</label>
      <input
        type="email"
        v-model="form.email"
        id="email"
        class="w-full border border-gray-300 p-2 rounded text-black"
      />
    </div>
    <div>
      <label for="message" class="block text-gray-700">Message:</label>
      <textarea
        v-model="form.message"
        id="message"
        class="w-full border border-gray-300 p-2 rounded h-24 text-black"
      ></textarea>
    </div>
    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const form = reactive({
      name: '',
      is_anonymous: false,
      email: '',
      message: '',
    });

    const submitFeedback = () => {
      // Contoh: kirim data ke server
      console.log('Feedback submitted:', form);

      // Reset form setelah submit
      form.name = '';
      form.is_anonymous = false;
      form.email = '';
      form.message = '';
      alert('Thank you for your feedback!');
    };

    return { form, submitFeedback };
  },
});
</script>
