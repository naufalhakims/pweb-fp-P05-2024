<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    <section class="pt-24 pb-16 px-4">
      <div class="container mx-auto">
        <h1 class="text-4xl font-bold text-center mb-12 text-blue-700">Latest News</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(news, index) in newsList"
            :key="index"
            class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-4 text-blue-600">{{ news.title }}</h3>
              <p class="text-gray-700 leading-relaxed">{{ news.description }}</p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
  components: { Navbar, Footer },
  setup() {
    const newsList = [
      { title: 'Berita 1', description: 'Seorang warga tertangkap basah sedang menggunakan sabu-sabu ditempat umum tanpaa mengetahui bahwa tetangganya sedang bersama dengannya lalu melaporkan ke polisi setempat. Akses kode berikut untuk melihatt cuplikannya : UEVNV0VCUDV7bjR0aDVuX24wcDRMX2szbjRzfQ==' },
      { title: 'Berita 2', description: 'Belum ada satu bulan ku yakin masih ada sisa wangiku di bajumu namun kau tampak baik saja bahkan senyummu lebih lepas sedang aku di sini hampir gila kita tak temukan jalan sepakat akhiri setelah beribu debat panjang namun kau tampak baik saja bahkan senyummu lebih lepas sedang aku di sini belum terima bohongkah tangismu sore itu di pelukku? nyatanya pergiku pun tak lagi mengganggumu apa sudah ada kabar lain yang kautunggu? sudah adakah yang gantikanku? yang khawatirkanmu setiap waktu yang cerita tentang apa pun sampai hal-hal tak perlu kalau bisa jangan buru-buru kalau bisa jangan ada dulu baru lewat satu bulan kemarin ulang tahunku tak ada pesan darimu tak apa mungkin kau lupa atau sudah ada hati yang harus kaujaga sudah adakah yang gantikanku? yang kauantar jemput setiap Sabtu yang slalu ingatkan untuk pakai sabuk pengamanmu kalau bisa jangan buru-buru sudah adakah yang gantikanku? yang khawatirkanmu setiap waktu yang cerita tentang apa pun sampai hal-hal tak perlu kalau bisa jangan buru-buru kalau bisa jangan ada dulu hu hu-uh hu-uh.' },
      { title: 'Berita 3', description: 'After of all sudden, I realize something. In the end, I thought I loved her too conditionally, too naive that to say that she could change herself by my will, too less love and priority that I gave when we were apart because i cant loved her who she is. I realize im in love with my expectation to her but no with herself. Sorry for making this really hurts to you. I know you will moved on sooner or later, thankyou for being my beloved girl for a decade. Its really fun to know you. Thanks for the memories we shared. Thankyou for everything. Im gonna miss you so much.' },
    ];

    return { newsList };
  },
});
</script>

