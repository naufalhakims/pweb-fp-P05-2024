import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import News from '@/views/News.vue';
import Login from '@/views/Login.vue';
import Admin from '@/views/Admin.vue';
import AdminCreate from '@/views/AdminCreate.vue';
import AdminDetail from '@/views/AdminDetail.vue';
import AdminEdit from '@/views/AdminEdit.vue';
import Crowdfund from '@/views/Crowdfund.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/news', component: News },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin },
  { path: '/admin/create', component: AdminCreate },
  { path: '/admin/:crowdfund_id', component: AdminDetail },
  { path: '/admin/:crowdfund_id/edit', component: AdminEdit },
  { path: '/crowdfund', component: Crowdfund }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
