import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pessoas from '../views/pessoas/Pessoas.vue'
import Pessoa from '../views/pessoas/Pessoa.vue'
import Mediadores from '../views/mediadores/Mediadores.vue'
import Especialidades from '../views/especialidades/Especialidades.vue'
import Ramos from '../views/ramos/Ramos.vue'
import Areas from '../views/areas/Areas.vue'






Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pessoas',
    name: 'pessoas',
    component: Pessoas
  },
  {
    path: '/areas',
    name: 'areas',
    component: Areas
  },
  {
    path: '/ramos',
    name: 'ramos',
    component: Ramos
  },
  {
    path: '/especialidades',
    name: 'especialidades',
    component: Especialidades
  },
  {
    path: '/mediadores',
    name: 'mediadores',
    component: Mediadores
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
