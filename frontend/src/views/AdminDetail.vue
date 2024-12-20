<!-- filepath: /frontend/src/views/AdminDetail.vue -->
<template>
  <div class="min-h-screen bg-stone-100">
    <Navbar />
    <main class="container mx-auto pt-20 px-4">
      <!-- Loading Indicator -->
      <div v-if="loading" class="text-center text-gray-600">
        Loading crowdfund details...
      </div>

      <!-- Error Message -->
      <div v-else-if="error" class="mb-4 p-4 bg-red-200 text-red-800 rounded">
        {{ error }}
      </div>

      <!-- Crowdfund Details -->
      <div v-else-if="crowdfund" class="bg-white p-6 rounded-lg shadow-md mb-5">
        <h2 class="text-3xl font-bold mb-4 text-blue-700">{{ crowdfund.name }}</h2>
        <p class="text-gray-700 mb-4">{{ crowdfund.description }}</p>
        <p class="text-gray-700 mb-2"><strong>Target Donation:</strong> Rp {{ formatCurrency(crowdfund.target) }}</p>
        <p class="text-gray-700 mb-4"><strong>Status:</strong> {{ crowdfund.status }}</p>

        <!-- Donation Progress -->
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Donation Progress</h3>
          <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              :style="{ width: donationProgress + '%' }"
              class="bg-blue-600 h-4 rounded-full transition-all duration-500"
            ></div>
          </div>
          <p class="text-gray-600">{{ donationProgress }}% of Rp {{ formatCurrency(crowdfund.target) }} reached</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-4 mb-6">
          <router-link
            :to="{ name: 'AdminEdit', params: { _id: crowdfund._id } }"
            class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
          >
            Edit Crowdfund
          </router-link>
          <button
            @click="deleteCrowdfund"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            Delete Crowdfund
          </button>
        </div>

        <div class="mb-6">
          <h3 class="text-2xl font-semibold mb-4 text-blue-700">User Comments</h3>
          <div v-if="comments.length > 0" class="space-y-4">
            <div
              v-for="comment in comments"
              :key="comment._id"
              class="p-4 bg-gray-50 border border-gray-200 rounded-lg flex justify-between items-start"
            >
              <div>
                <p class="text-gray-800"><strong>{{ comment.userName }}</strong>:</p>
                <p class="text-gray-700">{{ comment.message }}</p>
              </div>
              <button
                @click="deleteComment(comment._id)"
                class="text-red-500 hover:text-red-700 ml-4"
                title="Delete Comment"
              >
                &#10060;
              </button>
            </div>
          </div>
          <div v-else class="text-gray-600">No comments available.</div>
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
import {
  getAdminCrowdfundDetail,
  deleteCrowdfund,
  getCommentsOnCrowdfund,
  deleteComment,
} from '@/services/crowdfundService';
import { useRoute, useRouter } from 'vue-router';

interface Crowdfund {
  _id: string;
  name: string;
  description: string;
  target: number;
  status: string;
  current_donation: number;
}

interface Comment {
  _id: string;
  userName: string;
  message: string;
}

export default defineComponent({
  name: 'AdminDetail',
  components: { Navbar, Footer },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // Updated parameter retrieval to use _id
    const crowdfundId = route.params._id as string;

    const crowdfund = ref<Crowdfund | null>(null);
    const comments = ref<Comment[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(true);
    console.log(crowdfundId);

    const fetchCrowdfundDetails = async () => {
      try {
        const response = await getAdminCrowdfundDetail(crowdfundId);
        crowdfund.value = response.data.data;
        console.log(crowdfund.value);
      } catch (err) {
        error.value = 'Failed to fetch crowdfund details. Please try again later.';
        console.error('Error fetching crowdfund details:', err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getCommentsOnCrowdfund(crowdfundId);
        comments.value = response.data.data || []; // Ensure comments is always an array
        console.log(comments.value);
      } catch (err) {
        error.value = 'Failed to fetch comments. Please try again later.';
        console.error('Error fetching comments:', err);
      }
    };

    const deleteCommentHandler = async (commentId: string) => {
      if (!confirm('Are you sure you want to delete this comment?')) return;

      try {
        await deleteComment(crowdfundId, commentId);
        comments.value = comments.value.filter(comment => comment._id !== commentId);
        alert('Comment deleted successfully.');
      } catch (err) {
        alert('Failed to delete comment. Please try again.');
        console.error('Error deleting comment:', err);
      }
    };

    const deleteCrowdfundHandler = async () => {
      if (!confirm('Are you sure you want to delete this crowdfund? This action cannot be undone.')) return;

      try {
        await deleteCrowdfund(crowdfund.value!._id);
        alert('Crowdfund deleted successfully.');
        router.push({ name: 'AdminDashboard' });
      } catch (err) {
        console.error('Error deleting crowdfund:', err);
      }
    };

    const formatCurrency = (amount: number) => {
      return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    };

    const calculateDonationProgress = () => {
      if (!crowdfund.value || crowdfund.value.target === 0) return 0;
      const progress = (crowdfund.value.current_donation / crowdfund.value.target) * 100;
      return progress > 100 ? 100 : parseFloat(progress.toFixed(2));
    };

    onMounted(async () => {
      await Promise.all([fetchCrowdfundDetails(), fetchComments()]);
      loading.value = false;
    });

    return {
      crowdfund,
      comments,
      error,
      loading,
      deleteComment: deleteCommentHandler,
      deleteCrowdfund: deleteCrowdfundHandler,
      formatCurrency,
      donationProgress: calculateDonationProgress(),
    };
  },
});
</script>