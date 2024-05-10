<template>
    <div class="container mt-4">
        <h1>Cart Items</h1>
        <div v-if="cartItems.length === 0">
            <p>Your cart is empty</p>
        </div>
        <div v-else>
            <div v-for="(item, index) in cartItems" :key="index" class="card mb-3" style="flex-direction: unset !important;">
                <div class="col-md-4">
                    <img :src="item.images" class="card-img-top" alt="Product Image">
                </div>
                <div class="card-body col-md-8">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text">{{ item.description }}</p>
                    <p class="card-text"><strong>Price:</strong> {{ item.price }}</p>
                   <button @click="removeItem(item.id)">Remove Item</button>
                </div>
            </div>
            <div class="d-flex justify-content-between mb-2">
                <p><strong>Grand Total:</strong> {{ grandTotal }}</p>
                <button @click="checkout()">Checkout</button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

export default {
    setup() {
        const store = useStore();
        const cartItems = computed(() => store.getters.cartItems);
        
        const removeItem = (id) => {
            store.dispatch('removeOneItem', id);
        };
        
        const grandTotal = computed(() => {
            const total = cartItems.value.reduce((total, item) => total + parseFloat(item.price), 0);
            return total.toFixed(2);
        });

        const checkout = async() => {
            try {
                const response = await axios.post('/api/checkout',{ cartItems: cartItems.value });
                const sessionId = response.data.sessionId;
                const stripe = await loadStripe('pk_test_51OernzJ7YilluosLViNAJC2RUPGpKVFDwmn7MmVZoGXZhDGBFrkigEYSyZcTgWj7you2buBAXkrfq7jACGvbtzfl00YJbqLvW3');
                stripe.redirectToCheckout({ sessionId: sessionId });
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        return { cartItems, removeItem, grandTotal,checkout };
    },
};
</script>


<style>
  .container{
    min-height: calc(100vh - 200px);
  }
</style>
