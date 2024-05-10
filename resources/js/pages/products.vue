<template>
  <div class="container mt-4">
    <!-- Display products as cards -->
    <div>
      <h1 class="text-center">Products</h1>
    </div>

    <!-- Dropdown for filtering -->
    <div class="d-flex justify-content-between">
      <input type="text" style="width: 40%;"  placeholder="Search by product name" v-model="searchQuery">
      <p class="nav-item dropdown">
        <a class="dropdown-toggle text-dark ml-2" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Filter Products
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <p class="dropdown-item" @click="filterProducts('cheap_to_expensive')">Cheap to Expensive</p>
          <p class="dropdown-item" @click="filterProducts('expensive_to_cheap')">Expensive to Cheap</p>
          <p class="dropdown-item" @click="filterProducts('a_z')">A to Z</p>
          <p class="dropdown-item" @click="filterProducts('z_a')">Z to A</p>
        </div>
      </p>
    </div>

    <div class="row mt-2">
      <div class="col-md-4 mb-4" v-for="product in paginatedProducts" :key="product.id">
        <div class="card">
            <router-link :to="'/products/' + product.id">
              <img :src="product.images" class="card-img-top" alt="Product Image">
            </router-link>
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text">{{ truncateDescription(product.description) }}</p>
              <p class="card-text"><strong>Price:</strong> ${{ product.price }}</p>
            </div>
          </div>
      </div>
    </div>

    <!-- Pagination controls for all products -->
    <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from 'axios';
import Pagination from '../components/paginate.vue'; // Adjust the path if necessary

export default {
    components: {
      Pagination
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    }
  },
  setup() {
    const products = ref([]);
    const currentPage = ref(1);
    const pageSize = 6;
    const searchQuery = ref('');

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        products.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    const totalPages = computed(() => Math.ceil(products.value.length / pageSize));

    const filteredProducts = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return query ?
        products.value.filter(product => product.name.toLowerCase().includes(query)) :
        products.value;
    });

    const paginatedProducts = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const query = searchQuery.value.toLowerCase();
      return query ? filteredProducts.value : filteredProducts.value.slice(startIndex, endIndex);
    });

    function goToPage(page) {
      currentPage.value = page;
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    }

    function previousPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    function filterProducts(filterOption) {
      switch (filterOption) {
        case 'cheap_to_expensive':
          products.value.sort((a, b) => a.price - b.price);
          break;
        case 'expensive_to_cheap':
          products.value.sort((a, b) => b.price - a.price);
          break;
        case 'a_z':
          products.value.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'z_a':
          products.value.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // No sorting applied for other options
          break;
      }
      // Reset to the first page after sorting/filtering
      currentPage.value = 1;
    }

    function truncateDescription(description) {
      const maxLength = 70;
      if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
      } else {
        return description;
      }
    }

    return {
      searchQuery,
      paginatedProducts,
      currentPage,
      totalPages,
      goToPage,
      nextPage,
      previousPage,
      filterProducts,
      truncateDescription
    };
  }
};
</script>

<style>
  .container{
    min-height: calc(100vh - 200px);
  }
  /* .footer{
    position: unset !important;
  } */
</style>