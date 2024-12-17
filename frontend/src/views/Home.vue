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
            <p class="text-gray-600">Lacak penggunaan dana dan lihat dampak donasi Anda secara real-time.</p>
          </div>
        </div>
      </section>

      <section id="faq" class="mb-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div v-for="(item, index) in faqItems" :key="index" class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-2 text-blue-600">{{ item.question }}</h3>
            <p class="text-gray-600">{{ item.answer }}</p>
          </div>
        </div>
      </section>

      <section id="feedback" class="mb-16">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">Feedback</h2>
        <FeedbackForm />
        <div
          v-if="feedbacks.length"
          class="mt-6 bg-white p-8 rounded-lg shadow-lg"
        >
          <h3 class="text-2xl font-bold mb-4 text-blue-600">User Feedbacks:</h3>
          <ul class="space-y-4">
            <li
              v-for="(feedback, index) in feedbacks"
              :key="index"
              class="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <strong class="text-blue-600">{{ feedback.is_anonymous ? 'Anonymous' : feedback.name }}</strong>: 
              <p class="mt-2 text-gray-700">{{ feedback.message }}</p>
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

    onMounted(async () => {
      const response = await getFeedbacks();
      feedbacks.value = response.data;
    });

    return { feedbacks, faqItems };
  },
});
</script>