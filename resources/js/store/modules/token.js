export default {
    namespaced: true,
    state: {
        // Define variables
        token: localStorage.getItem('token') || null,
    },
    mutations: {
        // Update variable values
        UPDATE_TOKEN(state, payload) {
            state.token = payload;
        }
    },
    actions: {
        // Actions to be performed
        setToken(context, payload) {
            localStorage.setItem('token', payload);
            context.commit('UPDATE_TOKEN', payload);
        },
        removeToken(context) {
            localStorage.removeItem('token');
            context.commit('UPDATE_TOKEN', null);
        },
    },
    getters: {
        // Get state variable values
        getToken: function(state) {
            return state.token;
        }
    }
}