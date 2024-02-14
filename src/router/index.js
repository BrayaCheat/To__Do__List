import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import edit from '@/views/edit.vue'
import errorPage from '@/views/errorPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: home
    },
    {
      name: 'edit',
      path: '/edit/:id',
      component: edit,
      props: true
    },
    {
      name: 'errorPage',
      path: '/errorPage',
      component: errorPage
    }
    
  ]
})

export default router
