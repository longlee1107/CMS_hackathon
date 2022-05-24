import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);
export const router = new VueRouter({
    routes: [{
        path: '/admin',
        name: 'admin',
        component: () =>
            import ('../page/Admin')
    },
        {
            path: '/leader',
            name: 'leader',
            component: () =>
                import ('../page/Leader')
        },
        {
            path: '/',
            name: 'login',
            component: () => import('../page/Login')
        },
        {
            path: '/staff',
            name: 'staff',
            component: () => import('../page/Staff')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import ('@/page/Profile')
        },
        {
            path: '/admin/attendance',
            name: 'attendance',
            component: () => import ('@/page/AdminAttendanceManagement')
        }
    ],
    mode: "history"
})