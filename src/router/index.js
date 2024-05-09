import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'actividades',
          component: () => import('../pages/actividades.vue'),
          name: 'activities'
        },
        {
          path: 'incidentes',
          component: () => import('../pages/incidentes.vue'),
          name: 'incidentes'
        },
        {
          path: 'incidentes/adicionar',
          component: () => import('../pages/incidentForm.vue'),
          name: 'incidentes.add'
        },
        {
          path: 'actividades/adicionar',
          component: () => import('../pages/actividadeForm.vue'),
        },
        {
          path: 'utilizadores/adicionar',
          component: () => import('../pages/utilizadoresForm.vue'),
        },
        {
          path: 'actividades/detalhes/:id',
          component: () => import('../pages/actividadeDetalhes.vue'),
          name: 'actividades.detalhes',
          props: true
        },
        {
          path: 'utilizadores',
          component: () => import('../pages/utilizadores.vue'),
          name: 'utilizadores'
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: 'forgot-password',
          component: () => import('../pages/forgotPassword.vue'),
        },
        {
          path: 'recovery-password',
          component: () => import('../pages/recoveryPassword.vue'),
        },
        {
          path: 'verifycode',
          component: () => import('../pages/verifyCode.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
