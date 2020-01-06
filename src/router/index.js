import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login' // 登录页
import Layout from '@/views/layout' // 登录页
import Boss from '@/views/boss' // boss
import Project from '@/views/project' // 项目页

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/Layout',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/Layout',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/Boss',
        component: Boss
      },
      {
        path: '/Project',
        component: Project
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
