import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);
export const router = new VueRouter({
    routes: [{
            path: '/admin',
            name: 'admin',
            component: () =>
                import ('@/page/Admin')
        },
        {
            path: '/leader',
            name: 'leader',
            component: () =>
                import ('@/page/Leader')
        },
        {
            path: '/',
            name: 'login',
            component: () =>
                import ('@/page/Login')
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: () =>
                import ('@/page/UserDetail')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () =>
                import ('@/page/Profile')
        },
        {
            path: '/overtime',
            name: 'overtime',
            component: () =>
                import ('@/page/OverTime')
        }
    ],
    mode: "history"
})