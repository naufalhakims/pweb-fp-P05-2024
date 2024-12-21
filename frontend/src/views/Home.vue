<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <header class="bg-gradient-to-r from-blue-800 to-blue-950 text-white flex items-center justify-center" style="height: 100vh;">
      <div class="text-center">
        <h1 class="text-5xl font-bold mb-4">Welcome to BisaKita</h1>
        <p class="text-xl mt-2 max-w-2xl mx-auto">Platform untuk membantu penggalangan dana dan mewujudkan impian bersama</p>
      </div>
    </header>
    <main class="container mx-auto mt-10 px-4">
      <section id="about" class="mb-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">About Us</h2>
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <p class="text-lg text-gray-700 leading-relaxed">
            BisaKita adalah platform inovatif yang menghubungkan individu dan komunitas untuk saling membantu mewujudkan impian. Kami percaya bahwa dengan kekuatan kolaborasi, kita bisa mencapai hal-hal luar biasa. BisaKita hadir untuk memfasilitasi penggalangan dana yang transparan, aman, dan efektif.
          </p>
        </div>
      </section>

      <section id="services" class="mb-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 class="text-xl font-semibold mb-3 text-blue-600">Penggalangan Dana</h3>
            <p class="text-gray-600">Mulai kampanye penggalangan dana Anda dengan mudah dan cepat.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 class="text-xl font-semibold mb-3 text-blue-600">Donasi Aman</h3>
            <p class="text-gray-600">Sistem pembayaran yang aman dan terpercaya untuk setiap donasi.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 class="text-xl font-semibold mb-3 text-blue-600">Transparansi</h3>
            <p class="text-gray-600">Laporan lengkap dan transparan untuk setiap kampanye yang Anda buat.</p>
          </div>
        </div>
      </section>

      <section id="faq" class="mb-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">FAQ</h2>
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <ul>
            <li v-for="item in faqItems" :key="item.question" class="mb-4">
              <h3 class="text-xl font-semibold text-blue-600">{{ item.question }}</h3>
              <p class="text-gray-700">{{ item.answer }}</p>
            </li>
          </ul>
        </div>
      </section>

      <section id="feedback" class="mb-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">User Feedback</h2>
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <FeedbackForm @feedback-submitted="fetchFeedbacks" />
          
          <ul class="mt-6">
            <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">What Do they Say?</h2>
            <li v-for="feedback in feedbacks" :key="feedback._id" class="mb-4 p-4 bg-gray-100 text-black rounded-md shadow-md">
              <p class="text-lg font-semibold">{{ feedback.is_anonymous ? 'Anonymous' : feedback.name }}</p>
              <p class="text-gray-700">{{ feedback.message }}</p>
            </li>
          </ul>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import FeedbackForm from '@/components/FeedbackForm.vue';
import Footer from '@/components/Footer.vue';
import { getFeedbacks } from '@/services/feedbackService';

export default defineComponent({
  components: { Navbar, FeedbackForm, Footer },
  setup() {
    const feedbacks = ref<any[]>([]);
    const faqItems = ref([
      {
        question: "Bagaimana cara memulai penggalangan dana?",
        answer: "Daftar akun, isi formulir kampanye, dan verifikasi identitas Anda. Setelah disetujui, kampanye Anda akan aktif."
      },
      {
        question: "Apakah ada biaya untuk menggunakan BisaKita?",
        answer: "BisaKita mengenakan biaya administrasi kecil untuk setiap donasi yang berhasil. Detailnya dapat dilihat di halaman Syarat dan Ketentuan."
      },
      {
        question: "Berapa lama proses pencairan dana?",
        answer: "Proses pencairan dana biasanya memakan waktu 3-5 hari kerja setelah kampanye berakhir atau target tercapai."
      }
    ]);

    const fetchFeedbacks = async () => {
      try {
        const response = await getFeedbacks();
        feedbacks.value = response.data.data;
      } catch (error) {
        console.error('Failed to fetch feedbacks:', error);
      }
    };

    onMounted(() => {
      fetchFeedbacks();
    });

    return { feedbacks, faqItems, fetchFeedbacks };
  },
});
</script>