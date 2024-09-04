import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Clothes from '../views/Clothes.vue'
import Access from '../views/Access.vue'
import Create from '../views/CreateUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/clothes',
      name: 'clothes',
      component: Clothes,
      meta: {requiresAuth: true},
    },
    {
      path: '/access',
      name: 'access',
      component: Access,
      meta: {requiresAuth: true},
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    }
  ]
});

router.beforeEach((to, from, next) => {
  // Kontrollera om routen kräver autentisering
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const token = localStorage.getItem('access_token');
    if (!token) {
      // Om användaren inte är inloggad, navigera till logga in-sidan
      next('/login');
      alert("Vänligen logga in för att visa denna sida")
    } else {
      // Annars tillåt åtkomst
      next();
    }
  } else {
    // Om routen inte kräver autentisering, tillåt åtkomst
    next();
  }
});

export default router
