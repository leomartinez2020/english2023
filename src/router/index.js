import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Activity from '@/views/Activity.vue'
import Activity2 from '@/views/Activity2.vue'
// import Activity3 from '@/views/Activity3.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/activity1', name: 'activity1', component: Activity },
    { path: '/activity2', name: 'activity2', component: Activity2 },
    // { path: '/activity3', name: 'activity3', component: Activity3 },
    { path: '/activity3', name: 'activity3', component: () => import("@/views/Activity3.vue") },
    { path: '/activity/:id', component: ()=>import('@/views/ActivityShow.vue') },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
    linkActiveClass: 'active-link'
})

export default router
