<template>
    <swiper
      :slidesPerView="slidesPerView"
      :spaceBetween="spaceBetween"
      :freeMode="freeMode"
      :autoplay="autoplay"
      :navigation="navigation"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <div class="card">
          <a :href="`/products/${slide.id}`"> 
            <img :src="slide.images" class="card-img-top" alt="Product Image">
          </a>
          <div class="card-body">
            <h5 style="height: 50px;" class="card-title">{{ truncateTitle(slide.name) }}</h5>
            <p class="card-text"><strong>Price:</strong> ${{ slide.price }}</p>
            <button @click="addToCart(slide)">Add to Cart</button>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </template>
  
  <script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
  
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    props: {
      slides: {
        type: Array,
        required: true
      },
      slidesPerView: {
        type: Number,
        default: 4
      },
      spaceBetween: {
        type: Number,
        default: 30
      },
      freeMode: {
        type: Boolean,
        default: true
      },
      autoplay: {
        type: Object,
        default: () => ({
          delay: 2500,
          disableOnInteraction: false,
        })
      },
      navigation: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      truncateTitle(title) {
        const maxLength = 25;
        if (title.length > maxLength) {
          return title.slice(0, maxLength) + '...';
        } else {
          return title;
        }
      },
      addToCart(product) {
        this.$emit('add-to-cart', product);
      }
    },
    data() {
      return {
        modules: [Autoplay, FreeMode, Navigation]
      };
    }
  };
  </script>
  
  <style>
  /* Add any custom styling for the Swiper slider component */
  </style>
  