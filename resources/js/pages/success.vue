<template>
    <div class="container">
      <div class="row mt-4">
          <div class="col-lg-4 col-md-4 col-sm-12 col-12">
            <img class="img-fluid for-light" src="/images/left-img.png" alt="">
          </div>


          <div class="col-lg-4 col-md-4 col-sm-12 col-12 text-center mt-4">
            <img  class="img-fluid for-light d-flex float-right" src="/images/cap-img.png" alt="">
              <h1>Congratulations!</h1>
              <p class="f-16">Your order has been placed successfully.</p>
              <a href="/" class="btn btn-primary mt-4 mb-5" style="color: #007bff !important; background-color: white;">Continue Shopping</a>
          </div>
          
          <div class="col-lg-4 col-md-4 col-sm-12 col-12">
            <img class="img-fluid for-light" src="/images/right-img.png" alt="">
          </div>
        </div>
    </div>
</template>

<script>

import { useStore } from 'vuex';

export default {
  mounted() {
    const store = useStore();
    store.dispatch('removeCart');
  }
}

</script>
<style >
  .container{
    min-height: calc(100vh - 152px);
  }
  /* .footer{
    bottom: 0 !important;
  } */
</style>