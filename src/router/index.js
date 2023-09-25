import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import TeamView from '@/views/TeamView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/projects',
    name: 'projects',
    component:ProjectsView
  },
  {
    path: '/team',
    name: 'team',
    component:TeamView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
