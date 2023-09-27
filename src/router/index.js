import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import TeamView from '@/views/TeamView.vue'
import LoginView from '@/views/LoginView'
import SignupView from '@/views/SignUpView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
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
  },
  {
    path: '/login',
    name: 'login',
    component:LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component:SignupView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
