import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'list',
    component: () => import('@/views/List.vue'),
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/Create.vue'),
  },
  {
    path: '/task/:id',
    name: 'task',
    component: () => import('@/views/Task.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
