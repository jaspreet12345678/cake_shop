<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click="previousPage">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
          <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" aria-label="Next" @click="nextPage">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    methods: {
      changePage(page) {
        this.$emit('page-change', page);
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.$emit('page-change', this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$emit('page-change', this.currentPage + 1);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styling for the pagination component */
  </style>
  