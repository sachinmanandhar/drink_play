import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter)
const routes = [
    {
        path :'/',
        component: () => import(/* webpackChunkName: "main" */ '@/components/templates/LandingPage'),
    },
    {
        path:'/CardGame',
        component: () => import(/* webpackChunkName: "main" */ '@/components/templates/CardGame'),
        name:'card_game'
    },
    {
        path:'/GameOver',
        component: () => import(/* webpackChunkName: "main" */ '@/components/templates/GameOver'),
        name:'game_over'
    }, 
    {
        path:'/AddRule',
        component: () => import(/* webpackChunkName: "main" */ '@/components/templates/AddRule'),
        name:'add_rule'
    }, 

]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
export default router