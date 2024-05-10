<template>
  <nav class="navbar navbar-expand-sm bg-white navbar-dark" style="box-shadow: inset #b3923361 0px 0px 15px;">
    <router-link class="navbar-brand" :to="{ name: 'Dashboard' }">
      <img src="/images/logo.png" alt="Logo" style="height: 70px;">
    </router-link>
    <div class="d-flex w-75 justify-content-end">
      <ul v-if="$store.getters.getToken" class="navbar-nav">
        <li class="nav-item">
          <router-link class="font-weight-bold text-dark mr-4 ml-2" :to="{ name: 'Dashboard' }">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link class="font-weight-bold text-dark mr-4 ml-2" :to="{ name: 'Products' }">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link class="font-weight-bold text-dark mr-4 ml-2" :to="{ name: 'Orders' }">Orders</router-link>
        </li>
        <li class="nav-item">
          <router-link class="font-weight-bold text-dark mr-4 ml-2" :to="{ name: 'Cart' }">{{ $store.getters.cartItems.length ? $store.getters.cartItems.length : '' }} Cart</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="dropdown-toggle text-dark ml-2 font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Profile
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <p class="dropdown-item" aria-disabled="true">{{ $store.getters.getName }}</p>
            <button class="dropdown-item text-success" @click="logout">Logout</button>
          </div>
        </li>
      </ul>
      <ul v-if="!$store.getters.getToken" class="navbar-nav">
        <li class="nav-item">
          <router-link class="text-lg-left font-weight-bold text-dark" :to="{ name: 'Login' }">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="font-weight-bold text-dark ml-2" :to="{ name: 'Register' }">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <router-view></router-view>
  <footer class="footer bg-white text-white py-4" style="box-shadow: inset #b3923361 0px 0px 15px;">
    <div class="text-center">
      <p class="text-dark mt-2">Copyright © 2023 Coating and Baking. All rights reserved.</p>
    </div>
  </footer>
</template>
  
<script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        name: '',
      };
    },
    setup() {
      const store = useStore();
      const router = useRouter();
  
      function logout() {
        store.dispatch('removeToken');
        store.dispatch('removeName');
        store.dispatch('removeCart');
        router.push({ name: 'Dashboard' });
      }
  
      return {
        logout
      };
    }
  };
</script>