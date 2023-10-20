import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import MyTasksView from '@/views/MyTasksView.vue'
import TeamView from '@/views/TeamView.vue'
import LoginView from '@/views/LoginView'
import SignupView from '@/views/SignUpView'
import ProjectsView from '@/views/ProjectsView.vue'
import NotFoundView from '@/views/NotFoundView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/myTasks',
    name: 'MyTasks',
    component:MyTasksView
  },
  {
    path: '/team',
    name: 'team',
    component:TeamView
  },
  {
    path: '/',
    name: 'login',
    component:LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component:SignupView
  },
  {
    path: '/projects',
    name: 'projects',
    component:ProjectsView
  },
  {
    path: '*',
    name: 'NotFoundView',
    component: NotFoundView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
