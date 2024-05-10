import { createWebHistory, createRouter } from 'vue-router';
import login from './pages/login.vue';
import register from './pages/register.vue';
import dashboard from './pages/dashboard.vue';
import store from './store'
import product from './pages/products.vue';
import ProductDetails from './pages/productDetails.vue';
import Cart from './pages/Cart.vue';
import Success from './pages/success.vue';
import Cancel from './pages/cancel.vue';
import Order from './pages/order.vue';
import OrdersDetail from './pages/ordersDetail.vue';
import NotFound from './pages/notFound.vue';

const routes = [
    {
        path : '/',
        name : 'Dashboard',
        component : dashboard,
        meta:{
            requiresAuth:true
        }
    },
    {
        path : '/login',
        name : 'Login',
        component : login,
        meta:{
            requiresAuth:false
        }
    },
    {
        path : '/register',
        name : 'Register',
        component : register,
        meta:{
            requiresAuth:false
        }
    },
    {
        path : '/products',
        name : 'Products',
        component : product,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/products/:id',
        name: 'productDetails',
        component: ProductDetails,
        props: true // Pass route params as props to the component
    },
    {
        path : '/carts',
        name : 'Cart',
        component : Cart,
        meta:{
            requiresAuth:true
        }
    },
    {
        path : '/success',
        name : 'success',
        component : Success,
        meta:{
            requiresAuth:true
        }
    },
    {
        path : '/cancel',
        name : 'cancel',
        component : Cancel,
        meta:{
            requiresAuth:true
        }
    },
    {
        path : '/orders',
        name : 'Orders',
        component : Order,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: '/orders/:id',
        name: 'orderDetails',
        component: OrdersDetail,
        props: true // Pass route params as props to the component
    },
    {
        path: '/:catchAll(.*)', // Define a parameter with a custom regular expression
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


router.beforeEach((to,from) =>{
    if(to.meta.requiresAuth && store.getters.getToken == 0){
        return { name : 'Login'}
    }
    if(to.meta.requiresAuth == false && store.getters.getToken != 0){
        return { name : 'Dashboard'}
    }
})

export default router;
