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
            component: () =>
                import ('../page/Login')
        },
        {
            path: '/staff',
            name: 'staff',
            component: () =>
                import ('../page/Staff')
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
        },
        {
            path: '/admin/attendance',
            name: 'attendance',
            component: () =>
                import ('@/page/AdminAttendanceManagement')
        },
        {
            path: '/timelate',
            name: 'timelate',
            component: () =>
                import ('@/page/TimeLate')
        },
        {
            path: '/day-offs',
            name: 'day-offs',
            component: () =>
                import ('@/page/AbsentRequest')
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: () =>
                import ('@/page/UserDetail')
        },

    ],
    mode: "history"
})