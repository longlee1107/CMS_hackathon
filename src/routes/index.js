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
            path:'/leader',
            name:'leader',
            component:()=>import('../page/Leader')
        },

     

    ],
    mode: "history"
})