<template>
  <div class="container mt-2">
    <!-- Product details -->
    <div>
      <h1>Product Details</h1>
    </div>
    <div class="row" style="margin-top: 20px;">
      <div class="col-md-6">
        <!-- Left: Product image -->
        <img :src="product.images" class="img-fluid" alt="Product Image">
      </div>
      <div class="col-md-6">
        <!-- Right: Product details -->
        <h2><strong>Title:</strong> {{ product.name }}</h2>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Price:</strong> {{ product.price }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
    <div class="mt-5 mb-2">
      <h1>Related Products</h1>
      <swiper
        :slidesPerView="4"
        :spaceBetween="30"
        :freeMode="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :navigation="true"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="product in products11" :key="product.id">
          <div class="card">
            <a :href="`/products/${product.id}`"> 
              <img :src="product.images" class="card-img-top" alt="Product Image">
            </a>
            <div class="card-body">
              <h5 style="height: 50px;" class="card-title">{{ truncatetitle(product.name) }}</h5>
              <p class="card-text"><strong>Price:</strong> ${{ product.price }}</p>
              <button @click="addToCart(product)">Add to Cart</button>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
// import {useToast} from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-sugar.css';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import './style.css';
import {Autoplay, FreeMode, Navigation } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['id'],
  data() {
    return {
      products: [],
      products11: [],
      store: useStore()
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    addToCart(product){
      // const toast = useToast();
      const isExisting = this.store.getters.cartItems.some(item => item.id === product.id);

      if (!isExisting) {
        // If the product is not already in the cart, add it
        this.store.dispatch('addToCart', product);
        // toast.success('Product added to cart'); // Show success toast
      } else {
        // If the product is already in the cart, display a message
        // toast.warning('Product is already in the cart');
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('/api/products');
        this.products11 = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  },
  setup(props) {
    const { id } = props;
    console.log(id,"id");
    const product = ref([]);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        product.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    function truncatetitle(description) {
      const maxLength = 25;
      if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
      } else {
        return description;
      }
    }

    fetchProducts();
    return {
      modules: [Autoplay, FreeMode, Navigation],
      product,
      truncatetitle
    };
  },
}
</script>
