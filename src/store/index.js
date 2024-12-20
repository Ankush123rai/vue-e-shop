import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    cart: [],
    loading: false,
    error: null
  },
  getters: {
    cartItemCount: state => state.cart.reduce((total, item) => total + item.quantity, 0),
    cartTotal: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    },
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateCartItemQuantity(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    loadCart(state) {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        state.cart = JSON.parse(savedCart)
      }
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true)
      try {
        const response = await fetch('https://dummyjson.com/products')
        const data = await response.json()
        commit('setProducts', data.products)
      } catch (error) {
        commit('setError', error.message)
      } finally {
        commit('setLoading', false)
      }
    }
  }
})