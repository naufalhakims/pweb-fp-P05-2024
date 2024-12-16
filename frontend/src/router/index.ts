import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import News from '@/views/News.vue';
import Login from '@/views/Login.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/news', component: News },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
