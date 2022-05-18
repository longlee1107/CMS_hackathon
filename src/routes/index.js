import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
export const router = new VueRouter({
    routes:[
        {
            path:'/',
            name:'home',
            component:()=>import('../page/HomePage')
        },
        {
            path:'/staff',
            name:'staff',
            component:()=>import('../page/Staff')
        },

    ],
    mode: "history"
})