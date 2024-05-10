export default {
    namespaced: true,
    state: {
        // Define variables
        name: localStorage.getItem('name') || "Jaspreet"
    },
    mutations: {
        UPDATE_NAME(state, payload) {
            state.name = payload;
        }
    },
    actions: {
        setName(context, payload) {
            localStorage.setItem('name', payload);
            context.commit('UPDATE_NAME', payload);
        },
        removeName(context) {
            localStorage.removeItem('name');
            context.commit('UPDATE_NAME', null);
        }
    },
    getters: {
        getName: function(state) {
            return state.name;
        }
    }
}