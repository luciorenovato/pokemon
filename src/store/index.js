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
        state.cart.push(payload)
      }
    }
  })

  return Store
}
