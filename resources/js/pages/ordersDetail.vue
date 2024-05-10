<template>
  <div class="container">
    <table class="table mt-2">
      <thead class="thead-white">
        <tr>
          <th class="text-dark" scope="col">Id</th>
          <th class="text-dark" scope="col">Name</th>
          <th class="text-dark" scope="col">Description</th>
          <th class="text-dark" scope="col">Image</th>
          <th class="text-dark" scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.name }}</td>
          <td>{{ order.description }}</td>
          <td><img :src="order.images" class="img-fluid" alt="Product Image"></td>
          <td>{{ order.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    // Fetch orders from your API when the component is mounted
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        // Assuming you're using axios or fetch for API requests
        const response = await axios.get(`/api/orders/${this.id}`);
        // Assuming response.data is an array of order objects
        this.orders = JSON.parse(response.data.products);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error
      }
    },
  },
};
</script>

<style>
  .container{
    min-height: calc(100vh - 200px);
  }
</style>
