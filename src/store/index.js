import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      creatures: [],
      cart: []
    },
    mutations: {
      setCreatures (state, payload) {
        state.creatures = payload
      },
      addToCart (state, payload) {
        const index = state.cart.indexOf(payload)
        if (index > -1) {
          state.cart[index].qtd = state.cart[index].qtd + 1
        } else {
          state.cart.push(payload)
          state.cart[state.cart.indexOf(payload)].qtd = 1
        }
      },
      removeFromCart (state, payload) {
        const index = state.cart.indexOf(payload)
        state.cart.splice(index, 1)
      }
    }
  })

  return Store
}
