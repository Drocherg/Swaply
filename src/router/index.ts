import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Inicio1 from '@/views/Inicio1.vue'
import Login3 from '@/views/Login3.vue';
import InicioLoginAyuda1 from '@/views/InicioLoginAyuda1.vue';
import InicioRegister1 from '@/views/InicioRegister1.vue';
import Home1 from '@/views/Home1.vue';
import Like1 from '@/views/Like1.vue';
import Post1 from '@/views/Post1.vue';
import Post2 from '@/views/Post2.vue';
import MyProducts1 from '@/views/MyProducts1.vue';
import MyProducts2 from '@/views/MyProducts2.vue';
import Conver1 from '@/views/Conver1.vue';
import Conver2 from '@/views/Conver2.vue';
import Noti1 from '@/views/Noti1.vue';
import Ajustes1 from '@/views/Ajustes1.vue';
import AjustesNotis1 from '@/views/AjustesNotis1.vue';
import Datos1 from '@/views/Datos1.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Inicio1'
  },
  {
    path: '/Inicio1',
    name: 'Inicio1',
    component: Inicio1
  },
  {
    path: '/Login3',
    name: 'Login3',
    component: Login3
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
  {
  path: '/MyProducts2',
  name: 'MyProducts2',
  component: MyProducts2
  },
  
  {
    path: '/Conver1',
    name: 'Conver1',
    component: Conver1
  },
  {
    path: '/Conver2',
    name: 'Conver2',
    component: Conver2
  },
  {
    path: '/Noti1',
    name: 'Noti1',
    component: Noti1
  },
  {
  path: '/Ajustes1',
  name: 'Ajustes1',
  component: Ajustes1
  },
  {
    path: '/AjustesNotis1',
    name: 'AjustesNotis1',
    component: AjustesNotis1
  },
  {
    path: '/Datos1',
    name: 'Datos1',
    component: Datos1
  },
  {
    path: '/MyProducts2/:id',
    name: 'MyProducts2',
    component: MyProducts2,
    props: true, // Esto permite pasar el parámetro `id` como prop
  },
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
