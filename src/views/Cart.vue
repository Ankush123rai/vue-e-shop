<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold">Shopping Cart</h1>

    <div v-if="!cart.length" class="rounded-lg bg-gray-100 p-8 text-center">
      <p class="text-gray-600">Your cart is empty</p>
      <router-link to="/" class="mt-4 inline-block  hover:text-primary-700">
       <button class="bg-green-600 rounded-md p-3">Continue Shopping</button> 
      </router-link>
    </div>

    <div v-else>
      <div class="space-y-4">
        <div v-for="item in cart" :key="item.id" class="rounded-lg border bg-white p-4">
          <div class="flex items-center gap-4">
            <img :src="item.thumbnail" :alt="item.title" class="h-24 w-24 object-cover" />
            <div class="flex-1">
              <h3 class="text-lg font-semibold">{{ item.title }}</h3>
              <p class="text-gray-600">${{ item.price }}</p>
            </div>
            <div class="flex items-center gap-4">
              <input
                type="number"
                v-model="item.quantity"
                min="1"
                @change="updateQuantity(item.id, item.quantity)"
                class="w-20 rounded border p-2"
              />
              <button
                @click="removeFromCart(item.id)"
                class="bg-red-500 text-white rounded-md p-2 hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 rounded-lg border bg-white p-4">
        <div class="flex justify-between">
          <span class="text-lg font-semibold">Total:</span>
          <span class="text-lg font-bold">${{ cartTotal.toFixed(2) }}</span>
        </div>
        <button
          class="mt-4 w-full rounded bg-green-700 py-2 text-white hover:bg-primary-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { FiTrash2 } from 'react-icons/fi'

export default {
  name: 'Cart',
  components: {
    FiTrash2
  },
  setup() {
    const store = useStore()

    const cart = computed(() => store.state.cart)
    const cartTotal = computed(() => store.getters.cartTotal)

    const updateQuantity = (productId, quantity) => {
      store.commit('updateCartItemQuantity', { productId, quantity })
    }

    const removeFromCart = (productId) => {
      store.commit('removeFromCart', productId)
    }
    
    return {
      cart,
      cartTotal,
      updateQuantity,
      removeFromCart
    }
  }
}
</script>