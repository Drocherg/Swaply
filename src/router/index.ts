import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Inicio1 from '@/views/Inicio1.vue'
import Inicio2 from '@/views/Inicio2.vue';
import Inicio3 from '@/views/Inicio3.vue';
import Inicio4 from '@/views/Inicio4.vue';
import Inicio5 from '@/views/Inicio5.vue';
import Inicio6 from '@/views/Inicio6.vue';
import Login1 from '@/views/Login1.vue';
import Login3 from '@/views/Login3.vue';
import InicioLogin1 from '@/views/InicioLogin1.vue';
import InicioLoginAyuda1 from '@/views/InicioLoginAyuda1.vue';
import InicioRegister1 from '@/views/InicioRegister1.vue';
import Home1 from '@/views/Home1.vue';
import Like1 from '@/views/Like1.vue';
import Post1 from '@/views/Post1.vue';
import Post2 from '@/views/Post2.vue';
import MyProducts1 from '@/views/MyProducts1.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/Inicio1',
    name: 'Inicio1',
    component: Inicio1
  },
  {
    path: '/Inicio2',
    name: 'Inicio2',
    component: Inicio2
  },
  {
    path: '/Inicio3',
    name: 'Inicio3',
    component: Inicio3
  },
  {
    path: '/Inicio4',
    name: 'Inicio4',
    component: Inicio4
  },
  {
    path: '/Inicio5',
    name: 'Inicio5',
    component: Inicio5
  },
  {
    path: '/Inicio6',
    name: 'Inicio6',
    component: Inicio6
  },
  {
    path: '/Login1',
    name: 'Login1',
    component: Login1
  },
  {
    path: '/Login3',
    name: 'Login3',
    component: Login3
  },
  {
    path: '/InicioLogin1',
    name: 'InicioLogin1',
    component: InicioLogin1
  },
  {
    path: '/InicioLoginAyuda1',
    name: 'InicioLoginAyuda1',
    component: InicioLoginAyuda1
  },
  {
    path: '/InicioRegister1',
    name: 'InicioRegister1',
    component: InicioRegister1
  },
  {
    path: '/Home1',
    name: 'Home1',
    component: Home1
  },
  {
    path: '/Like1',
    name: 'Like1',
    component: Like1
  },
  {
    path: '/Post1',
    name: 'Post1',
    component: Post1
  },
  {
    path: '/Post2',
    name: 'Post2',
    component: Post2
  },
  {
    path: '/MyProducts1',
    name: 'MyProducts1',
    component: MyProducts1
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
