import { createStore } from 'vuex';

const store = createStore({
  modules: {
    auth: {
      state: {
        //define variables
        token : localStorage.getItem('token') || 0
      },
      mutations:{
        // update variable value
        UPDATE_TOKEN(state,payload){
          state.token = payload
        }
      },
      actions:{
        // action to be performed
        setToken(context,payload){
          localStorage.setItem('token',payload)
          context.commit('UPDATE_TOKEN',payload)
        },
        removeToken(context){
          localStorage.removeItem('token');
          context.commit('UPDATE_TOKEN', 0);
        }
      },
      getters:{
        // get state variable value
        getToken: function(state){
          return state.token
        }
      }
    },
    user_name: {
        state: {
          //define variables
          name : localStorage.getItem('name') || null
        },
        mutations:{
          // update variable value
          UPDATE_Name(state,payload){
            state.name = payload
          }
        },
        actions:{
          // action to be performed
          setName(context,payload){
            localStorage.setItem('name',payload)
            context.commit('UPDATE_Name',payload)
          },
          removeName(context){
            localStorage.removeItem('name');
            context.commit('UPDATE_Name', null);
          }
        },
        getters:{
          // get state variable value
          getName: function(state){
            return state.name
          }
        }
    },
    cart: {
        state: {
          // Initialize cart items from local storage or an empty array if not present
          items: JSON.parse(localStorage.getItem('cartItems')) || []
        },
        mutations: {
          // Update cart items and save them to local storage
          UPDATE_CART_ITEMS(state, items) {
            state.items = items;
            localStorage.setItem('cartItems', JSON.stringify(items));
          },
          // Add product to cart mutation
          ADD_TO_CART(state, product) {
            state.items.push(product); // Add product to cart
            localStorage.setItem('cartItems', JSON.stringify(state.items)); // Update local storage
          }
        },
        actions: {
          // Load cart items action
          loadCartItems({ commit }) {
            const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            commit('UPDATE_CART_ITEMS', storedItems);
          },
          // Add to cart action
          addToCart({ commit, state }, product) {
            commit('ADD_TO_CART', product); // Commit mutation to add product to cart
          },
          removeCart(context){
            localStorage.removeItem('cartItems');
            context.commit('ADD_TO_CART', []);
            context.commit('UPDATE_CART_ITEMS', []);
          },
          removeOneItem({ commit, state }, itemId) {
            const updatedItems = state.items.filter(item => item.id !== itemId);
            commit('UPDATE_CART_ITEMS', updatedItems); // Commit mutation to update cart items
          }
        },
        getters: {
          // Get cart items getter
          cartItems: (state) => state.items
        }
    }
  }
});

export default store;
