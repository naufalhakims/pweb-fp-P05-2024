<template>
  <footer class="bg-gradient-to-r from-blue-800 to-blue-950 text-white py-10">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center md:text-left">
          <h3 class="text-2xl font-bold mb-4">BisaKita</h3>
          <p class="text-blue-200">Platform untuk membantu penggalangan dana dan mewujudkan impian bersama.</p>
        </div>
        <div class="text-center">
          <h4 class="text-xl font-semibold mb-4">Misi Kami</h4>
          <p class="text-blue-200">
            Kami berkomitmen untuk memfasilitasi penggalangan dana yang transparan, 
            aman, dan efektif. Bersama-sama, kita bisa mewujudkan perubahan positif 
            dalam masyarakat.
          </p>
        </div>
        <div class="text-center md:text-right">
          <h4 class="text-xl font-semibold mb-4">Hubungi Kami</h4>
          <p class="mb-2 text-blue-200">Email: info@bisakita.com</p>
          <p class="text-blue-200">Telepon: +62 123 456 7890</p>
          <div class="mt-4 flex justify-center md:justify-end space-x-4">
            <span class="text-white text-2xl" title="Facebook">
              <i class="fab fa-facebook-square"></i>
            </span>
            <span class="text-white text-2xl" title="Twitter">
              <i class="fab fa-twitter-square"></i>
            </span>
            <span class="text-white text-2xl" title="Instagram">
              <i class="fab fa-instagram-square"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-blue-600 text-center">
        <p class="text-blue-200">&copy; {{ new Date().getFullYear() }} BisaKita. Hak Cipta Dilindungi.</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
</style>