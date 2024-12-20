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
  { path: '/', name: 'Home', component: Home },
  { path: '/news', name: 'News', component: News },
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin', name: 'Admin', component: Admin },
  { path: '/admin/create', name: 'AdminCreate', component: AdminCreate },
  
  { path: '/admin/:_id', name: 'AdminDetail', component: AdminDetail },
  { path: '/admin/:_id/edit', name: 'AdminEdit', component: AdminEdit },
  
  { path: '/crowdfund', name: 'Crowdfund', component: Crowdfund },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;