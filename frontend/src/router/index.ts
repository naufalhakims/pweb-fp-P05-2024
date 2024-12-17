import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import News from '@/views/News.vue';
import Login from '@/views/Login.vue';
import Admin from '@/views/Admin.vue';
import Crowdfund from '@/views/Crowdfund.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/news', component: News },
  { path: '/login', component: Login },
  {path: '/admin', component: Admin},
  {path: '/crowdfund', component: Crowdfund}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
