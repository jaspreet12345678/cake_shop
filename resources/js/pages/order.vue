<template>
    <div class="container">
        <table class="table mt-2">
            <thead class="thead-white">
                <tr>
                <th class="text-dark" scope="col">#</th>
                <th class="text-dark" scope="col">Order Id</th>
                <th class="text-dark" scope="col">Products</th>
                <th class="text-dark" scope="col">Payment Status</th>
                <th class="text-dark" scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in paginatedOrders" :key="order.id">
                    <td class="text-dark" >{{ order.id }}</td>
                    <td class="text-dark" >{{ order.order_id }}</td>
                    <td class="text-dark" >{{ JSON.parse(order.products).length }}</td>
                    <td class="text-dark" >{{ order.status ? "Paid" : 'Unpaid' }}</td>
                    <td class="text-dark"><router-link :to="'/orders/' + order.id">Details</router-link></td>
                </tr>
            </tbody>
        </table>
        <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
    </div>
</template>

<script>
import Pagination from '../components/paginate.vue'; // Adjust the path if necessary
export default {
    components: {
    Pagination
  },
    data() {
        return {
            orders: [],
            currentPage: 1,
            pageSize: 1
        };
    },
    computed: {
        paginatedOrders() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.orders.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.orders.length / this.pageSize);
        }
    },
    mounted() {
        // Fetch orders from your API when the component is mounted
        this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            try {
                // Assuming you're using axios or fetch for API requests
                const response = await axios.get('/api/orders'); // Replace '/api/orders' with your actual API endpoint
                this.orders = response.data; // Assuming the API returns an array of order objects
                console.log(this.orders,"orders");
            } catch (error) {
                console.error('Error fetching orders:', error);
                // Handle error
            }
        },
        changePage(page) {
            this.currentPage = page;
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        handlePageChange(page) {
            this.currentPage = page;
        }
    }
};
</script>

<style >
  .container{
    min-height: calc(100vh - 200px);
  }
  /* .footer{
    bottom: 0 !important;
  } */
</style>