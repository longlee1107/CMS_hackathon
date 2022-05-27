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
            path: '/leader/attendance-management',
            name: 'leaderAttendance',
            component: () =>
                import ('../page/LeaderAttendanceManagement')
        }, {
            path: '/leader/absent-management',
            name: 'leaderAbsent',
            component: () =>
                import ('../page/LeaderAbsentRequest')
        }, {
            path: '/leader/late-management',
            name: 'leaderLate',
            component: () =>
                import ('../page/LeaderTimeLate')
        },
        {
            path: '/leader/overtime',
            name: 'leaderOvertime',
            component: () =>
                import ('@/page/LeaderOverTime')
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
            path: '/staff/salary',
            name: 'staffSalary',
            component: () =>
                import ('../page/StaffSalary')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () =>
                import ('@/page/Profile')
        },
        {
            path: '/staff/profile',
            name: 'staff-profile',
            component: () =>
                import ('@/page/StaffProfile')
        },
        {
            path: '/admin/overtime',
            name: 'overtime',
            component: () =>
                import ('@/page/AdminOverTime')
        },
        {
            path: '/admin/attendance',
            name: 'attendance',
            component: () =>
                import ('@/page/AdminAttendanceManagement')
        },
        {
            path: '/admin/timelate',
            name: 'timelate',
            component: () =>
                import ('@/page/AdminTimeLate')
        },
        {
            path: '/admin/day-offs',
            name: 'day-offs',
            component: () =>
                import ('@/page/AdminAbsentRequest')
        },
        {
            path: '/admin/detail/:id',
            name: 'detail',
            component: () =>
                import ('@/page/AdminUserDetail')
        },

    ],
    mode: "history"
})